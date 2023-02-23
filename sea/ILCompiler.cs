namespace Sea;

internal class ILCompiler
{
    private readonly FileInfo cilFile;
    private readonly ILCompilerOptions buildOptions;

    public ILCompiler(FileInfo cilFile, ILCompilerOptions buildOptions)
    {
        this.cilFile = cilFile;
        this.buildOptions = buildOptions;
    }

    public FileInfo Emit(DirectoryInfo outPath)
    {
        var rootPath = AppContext.BaseDirectory;
        var aotPath = Path.Combine(Path.Combine(rootPath, "third-party"), "aot");
        var toolsPath = Path.Combine(Path.Combine(rootPath, "third-party"), "tools");
        var ilcExecutable = Path.Combine(toolsPath, Path.Combine("ilc", $"ilc{Platform.ExecutableFileExtension}"));
        var aotFrameworkPath = Path.Combine(aotPath, "framework");
        var aotSdkPath = Path.Combine(aotPath, "sdk");

        var baseName = Path.GetFileNameWithoutExtension(cilFile.Name);
        var outFile = new FileInfo(Path.Combine(outPath.FullName, $"{baseName}{Platform.ObjectFileExtension}"));
        var ilcArgFile = new FileInfo(Path.Combine(outPath.FullName, $"{baseName}.ilc.rsp"));

        var ilcArgs = new List<string>
        {
            cilFile.FullName,
            $"-o:{outFile.FullName}",
            $"-r:{Path.Combine(aotFrameworkPath, "Microsoft.CSharp.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "Microsoft.VisualBasic.Core.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "Microsoft.VisualBasic.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "Microsoft.Win32.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "Microsoft.Win32.Registry.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "mscorlib.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "netstandard.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.AppContext.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Buffers.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Collections.Concurrent.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Collections.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Collections.Immutable.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Collections.NonGeneric.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Collections.Specialized.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.Annotations.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.DataAnnotations.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.EventBasedAsync.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ComponentModel.TypeConverter.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Configuration.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Console.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Core.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Data.Common.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Data.DataSetExtensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Data.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.Contracts.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.Debug.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.DiagnosticSource.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.FileVersionInfo.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.Process.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.StackTrace.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.TextWriterTraceListener.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.Tools.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.TraceSource.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Diagnostics.Tracing.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Drawing.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Drawing.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Dynamic.Runtime.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Formats.Asn1.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Formats.Tar.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Globalization.Calendars.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Globalization.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Globalization.Extensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Compression.Brotli.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Compression.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Compression.FileSystem.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Compression.ZipFile.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.FileSystem.AccessControl.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.FileSystem.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.FileSystem.DriveInfo.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.FileSystem.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.FileSystem.Watcher.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.IsolatedStorage.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.MemoryMappedFiles.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Pipes.AccessControl.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.Pipes.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.IO.UnmanagedMemoryStream.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Linq.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Linq.Expressions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Linq.Parallel.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Linq.Queryable.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Memory.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Http.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Http.Json.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.HttpListener.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Mail.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.NameResolution.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.NetworkInformation.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Ping.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Quic.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Requests.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Security.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.ServicePoint.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.Sockets.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.WebClient.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.WebHeaderCollection.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.WebProxy.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.WebSockets.Client.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Net.WebSockets.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Numerics.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Numerics.Vectors.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ObjectModel.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Private.DataContractSerialization.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Private.Uri.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Private.Xml.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Private.Xml.Linq.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.DispatchProxy.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Emit.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Emit.ILGeneration.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Emit.Lightweight.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Extensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Metadata.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Reflection.TypeExtensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Resources.Reader.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Resources.ResourceManager.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Resources.Writer.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.CompilerServices.Unsafe.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.CompilerServices.VisualC.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Extensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Handles.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.InteropServices.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.InteropServices.JavaScript.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.InteropServices.RuntimeInformation.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Intrinsics.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Loader.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Numerics.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Serialization.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Serialization.Formatters.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Serialization.Json.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Serialization.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Runtime.Serialization.Xml.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.AccessControl.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Claims.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.Algorithms.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.Cng.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.Csp.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.Encoding.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.OpenSsl.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.Primitives.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Cryptography.X509Certificates.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Principal.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.Principal.Windows.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Security.SecureString.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ServiceModel.Web.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ServiceProcess.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.Encoding.CodePages.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.Encoding.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.Encoding.Extensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.Encodings.Web.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.Json.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Text.RegularExpressions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Channels.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Overlapped.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Tasks.Dataflow.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Tasks.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Tasks.Extensions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Tasks.Parallel.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Thread.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.ThreadPool.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Threading.Timer.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Transactions.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Transactions.Local.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.ValueTuple.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Web.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Web.HttpUtility.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Windows.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.Linq.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.ReaderWriter.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.Serialization.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.XDocument.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.XmlDocument.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.XmlSerializer.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.XPath.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "System.Xml.XPath.XDocument.dll")}",
            $"-r:{Path.Combine(aotSdkPath, "System.Private.CoreLib.dll")}",
            $"-r:{Path.Combine(aotSdkPath, "System.Private.DisabledReflection.dll")}",
            $"-r:{Path.Combine(aotSdkPath, "System.Private.Reflection.Execution.dll")}",
            $"-r:{Path.Combine(aotSdkPath, "System.Private.StackTraceMetadata.dll")}",
            $"-r:{Path.Combine(aotSdkPath, "System.Private.TypeLoader.dll")}",
            $"-r:{Path.Combine(aotFrameworkPath, "WindowsBase.dll")}",
            "--targetarch:x64",
            "--dehydrate",
            "--initassembly:System.Private.CoreLib",
            "--initassembly:System.Private.StackTraceMetadata",
            "--initassembly:System.Private.TypeLoader",
            "--initassembly:System.Private.Reflection.Execution",
            "--appcontextswitch:Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability=true",
            "--appcontextswitch:System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization=false",
            "--appcontextswitch:System.Diagnostics.Tracing.EventSource.IsSupported=false",
            "--appcontextswitch:System.Resources.ResourceManager.AllowCustomResourceTypes=false",
            "--appcontextswitch:System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported=false",
            "--appcontextswitch:System.Runtime.InteropServices.BuiltInComInterop.IsSupported=false",
            "--appcontextswitch:System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting=false",
            "--appcontextswitch:System.Runtime.InteropServices.EnableCppCLIHostActivation=false",
            "--appcontextswitch:System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization=false",
            "--appcontextswitch:System.StartupHookProvider.IsSupported=false",
            "--appcontextswitch:System.Threading.Thread.EnableAutoreleasePool=false",
            "--appcontextswitch:System.Text.Encoding.EnableUnsafeUTF7Encoding=false",
            "--feature:Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability=true",
            "--feature:System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization=false",
            "--feature:System.Diagnostics.Tracing.EventSource.IsSupported=false",
            "--feature:System.Resources.ResourceManager.AllowCustomResourceTypes=false",
            "--feature:System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported=false",
            "--feature:System.Runtime.InteropServices.BuiltInComInterop.IsSupported=false",
            "--feature:System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting=false",
            "--feature:System.Runtime.InteropServices.EnableCppCLIHostActivation=false",
            "--feature:System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization=false",
            "--feature:System.StartupHookProvider.IsSupported=false",
            "--feature:System.Threading.Thread.EnableAutoreleasePool=false",
            "--feature:System.Text.Encoding.EnableUnsafeUTF7Encoding=false",
            "--nowarn:\"1701; 1702; IL2121; 1701; 1702\"",
            "--singlewarn",
            $"--root:{cilFile.FullName}",
            $"--nosinglewarnassembly:{buildOptions.Assembly}",
            "--resilient",
            "--feature:System.Linq.Expressions.CanCompileToIL=false",
            "--feature:System.Linq.Expressions.CanEmitObjectArrayDelegate=false",
            "--feature:System.Linq.Expressions.CanCreateArbitraryDelegates=false"
        };

        if (buildOptions.Reflection)
        {
            ilcArgs.Add("--reflectiondata:all");
        }
        else
        {
            ilcArgs.Add("--reflectiondata:none");
        }

        if (buildOptions.StackTrace)
        {
            ilcArgs.Add("--stacktracedata");
        }

        if (buildOptions.Debug)
        {
            ilcArgs.Add("-g");
        }

        if (buildOptions.OptimizationMode != OptimizationMode.None)
        {
            ilcArgs.Add("--methodbodyfolding");
        
            switch (buildOptions.OptimizationMode)
            {
                case OptimizationMode.Default:
                    ilcArgs.Add("--optimize");
                    break;
                case OptimizationMode.Small:
                    ilcArgs.Add("--optimize-space");
                    break;
                case OptimizationMode.Fast:
                    ilcArgs.Add("--optimize-time");
                    break;
            }
        }

        if (Platform.OperatingSystem == OperatingSystem.Windows)
        {
            ilcArgs.AddRange(new List<string>()
            {
                "--appcontextswitch:RUNTIME_IDENTIFIER=win-x64",
                "--directpinvoke:System.Globalization.Native",
                "--directpinvoke:System.IO.Compression.Native",
                $"--directpinvokelist:{Path.Combine(aotSdkPath, "WindowsAPIs.txt")}",
            });
        }
        else
        {
            ilcArgs.AddRange(new List<string>()
            {
                "--directpinvoke:libSystem.Native",
                "--directpinvoke:libSystem.Globalization.Native",
                "--directpinvoke:libSystem.IO.Compression.Native",
                "--directpinvoke:libSystem.Net.Security.Native",
                "--directpinvoke:libSystem.Security.Cryptography.Native.OpenSsl"
            });

            if (Platform.OperatingSystem == OperatingSystem.Linux)
            {
                ilcArgs.Add("--appcontextswitch:RUNTIME_IDENTIFIER=linux-x64");
            }
            else if (Platform.OperatingSystem == OperatingSystem.MacOS)
            {
                ilcArgs.Add("--appcontextswitch:RUNTIME_IDENTIFIER=osx-x64");
            }
        }

        File.WriteAllLines(ilcArgFile.FullName, ilcArgs);

        var ilcArguments = $"@{ilcArgFile.FullName}";

        if (buildOptions.Verbose)
        {
            Logger.Log("Generating native object...");
        }

        Process.Execute(ilcExecutable, ilcArguments, verbose: buildOptions.Verbose);

        return outFile;
    }
}
