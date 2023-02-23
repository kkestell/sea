﻿using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Spectre.Console;

namespace Sea;

internal class ILGenerator
{
    private readonly ILGeneratorOptions buildOptions;

    public ILGenerator(ILGeneratorOptions buildOptions)
    {
        this.buildOptions = buildOptions;
    }

    private SyntaxTree AssemblyInfo()
    {
        var asmInfo = new StringBuilder();

        asmInfo.AppendLine("using System.Reflection;");
        
        asmInfo.AppendLine($"[assembly: AssemblyTitle(\"{buildOptions.Assembly}\")]");
        asmInfo.AppendLine("[assembly: AssemblyVersion(\"1.1.0\")]");
        asmInfo.AppendLine("[assembly: AssemblyFileVersion(\"1.1.0\")]");

        asmInfo.AppendLine("[assembly: AssemblyProduct(\"Foo\")]");
        asmInfo.AppendLine("[assembly: AssemblyInformationalVersion(\"1.3.3.7\")]");

        return CSharpSyntaxTree.ParseText(asmInfo.ToString());
    }

    private SyntaxTree GlobalUsings()
    {
        var asmInfo = new StringBuilder();

        asmInfo.AppendLine("global using System;");

        return CSharpSyntaxTree.ParseText(asmInfo.ToString());
    }

    public FileInfo Emit(DirectoryInfo outPath)
    {
        var optimizationLevel = buildOptions.OptimizationMode == OptimizationMode.None
            ? OptimizationLevel.Debug : OptimizationLevel.Release;

        var compilationOptions = new CSharpCompilationOptions(
            OutputKind.ConsoleApplication,
            optimizationLevel: optimizationLevel);

        var syntaxTrees = buildOptions.InputFiles
            .Select(x => CSharpSyntaxTree.ParseText(File.ReadAllText(x.FullName)))
            .Concat(new [] { AssemblyInfo(), GlobalUsings() });

        var refPath = Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "ref");

        var dllFiles = new List<string>
        {
            "Microsoft.CSharp.dll",
            "Microsoft.VisualBasic.Core.dll",
            "Microsoft.VisualBasic.dll",
            "Microsoft.Win32.Primitives.dll",
            "Microsoft.Win32.Registry.dll",
            "mscorlib.dll",
            "netstandard.dll",
            "System.AppContext.dll",
            "System.Buffers.dll",
            "System.Collections.Concurrent.dll",
            "System.Collections.dll",
            "System.Collections.Immutable.dll",
            "System.Collections.NonGeneric.dll",
            "System.Collections.Specialized.dll",
            "System.ComponentModel.Annotations.dll",
            "System.ComponentModel.DataAnnotations.dll",
            "System.ComponentModel.dll",
            "System.ComponentModel.EventBasedAsync.dll",
            "System.ComponentModel.Primitives.dll",
            "System.ComponentModel.TypeConverter.dll",
            "System.Configuration.dll",
            "System.Console.dll",
            "System.Core.dll",
            "System.Data.Common.dll",
            "System.Data.DataSetExtensions.dll",
            "System.Data.dll",
            "System.Diagnostics.Contracts.dll",
            "System.Diagnostics.Debug.dll",
            "System.Diagnostics.DiagnosticSource.dll",
            "System.Diagnostics.FileVersionInfo.dll",
            "System.Diagnostics.Process.dll",
            "System.Diagnostics.StackTrace.dll",
            "System.Diagnostics.TextWriterTraceListener.dll",
            "System.Diagnostics.Tools.dll",
            "System.Diagnostics.TraceSource.dll",
            "System.Diagnostics.Tracing.dll",
            "System.dll",
            "System.Drawing.dll",
            "System.Drawing.Primitives.dll",
            "System.Dynamic.Runtime.dll",
            "System.Formats.Asn1.dll",
            "System.Formats.Tar.dll",
            "System.Globalization.Calendars.dll",
            "System.Globalization.dll",
            "System.Globalization.Extensions.dll",
            "System.IO.Compression.Brotli.dll",
            "System.IO.Compression.dll",
            "System.IO.Compression.FileSystem.dll",
            "System.IO.Compression.ZipFile.dll",
            "System.IO.dll",
            "System.IO.FileSystem.AccessControl.dll",
            "System.IO.FileSystem.dll",
            "System.IO.FileSystem.DriveInfo.dll",
            "System.IO.FileSystem.Primitives.dll",
            "System.IO.FileSystem.Watcher.dll",
            "System.IO.IsolatedStorage.dll",
            "System.IO.MemoryMappedFiles.dll",
            "System.IO.Pipes.AccessControl.dll",
            "System.IO.Pipes.dll",
            "System.IO.UnmanagedMemoryStream.dll",
            "System.Linq.dll",
            "System.Linq.Expressions.dll",
            "System.Linq.Parallel.dll",
            "System.Linq.Queryable.dll",
            "System.Memory.dll",
            "System.Net.dll",
            "System.Net.Http.dll",
            "System.Net.Http.Json.dll",
            "System.Net.HttpListener.dll",
            "System.Net.Mail.dll",
            "System.Net.NameResolution.dll",
            "System.Net.NetworkInformation.dll",
            "System.Net.Ping.dll",
            "System.Net.Primitives.dll",
            "System.Net.Quic.dll",
            "System.Net.Requests.dll",
            "System.Net.Security.dll",
            "System.Net.ServicePoint.dll",
            "System.Net.Sockets.dll",
            "System.Net.WebClient.dll",
            "System.Net.WebHeaderCollection.dll",
            "System.Net.WebProxy.dll",
            "System.Net.WebSockets.Client.dll",
            "System.Net.WebSockets.dll",
            "System.Numerics.dll",
            "System.Numerics.Vectors.dll",
            "System.ObjectModel.dll",
            "System.Reflection.DispatchProxy.dll",
            "System.Reflection.dll",
            "System.Reflection.Emit.dll",
            "System.Reflection.Emit.ILGeneration.dll",
            "System.Reflection.Emit.Lightweight.dll",
            "System.Reflection.Extensions.dll",
            "System.Reflection.Metadata.dll",
            "System.Reflection.Primitives.dll",
            "System.Reflection.TypeExtensions.dll",
            "System.Resources.Reader.dll",
            "System.Resources.ResourceManager.dll",
            "System.Resources.Writer.dll",
            "System.Runtime.CompilerServices.Unsafe.dll",
            "System.Runtime.CompilerServices.VisualC.dll",
            "System.Runtime.dll",
            "System.Runtime.Extensions.dll",
            "System.Runtime.Handles.dll",
            "System.Runtime.InteropServices.dll",
            "System.Runtime.InteropServices.JavaScript.dll",
            "System.Runtime.InteropServices.RuntimeInformation.dll",
            "System.Runtime.Intrinsics.dll",
            "System.Runtime.Loader.dll",
            "System.Runtime.Numerics.dll",
            "System.Runtime.Serialization.dll",
            "System.Runtime.Serialization.Formatters.dll",
            "System.Runtime.Serialization.Json.dll",
            "System.Runtime.Serialization.Primitives.dll",
            "System.Runtime.Serialization.Xml.dll",
            "System.Security.AccessControl.dll",
            "System.Security.Claims.dll",
            "System.Security.Cryptography.Algorithms.dll",
            "System.Security.Cryptography.Cng.dll",
            "System.Security.Cryptography.Csp.dll",
            "System.Security.Cryptography.dll",
            "System.Security.Cryptography.Encoding.dll",
            "System.Security.Cryptography.OpenSsl.dll",
            "System.Security.Cryptography.Primitives.dll",
            "System.Security.Cryptography.X509Certificates.dll",
            "System.Security.dll",
            "System.Security.Principal.dll",
            "System.Security.Principal.Windows.dll",
            "System.Security.SecureString.dll",
            "System.ServiceModel.Web.dll",
            "System.ServiceProcess.dll",
            "System.Text.Encoding.CodePages.dll",
            "System.Text.Encoding.dll",
            "System.Text.Encoding.Extensions.dll",
            "System.Text.Encodings.Web.dll",
            "System.Text.Json.dll",
            "System.Text.RegularExpressions.dll",
            "System.Threading.Channels.dll",
            "System.Threading.dll",
            "System.Threading.Overlapped.dll",
            "System.Threading.Tasks.Dataflow.dll",
            "System.Threading.Tasks.dll",
            "System.Threading.Tasks.Extensions.dll",
            "System.Threading.Tasks.Parallel.dll",
            "System.Threading.Thread.dll",
            "System.Threading.ThreadPool.dll",
            "System.Threading.Timer.dll",
            "System.Transactions.dll",
            "System.Transactions.Local.dll",
            "System.ValueTuple.dll",
            "System.Web.dll",
            "System.Web.HttpUtility.dll",
            "System.Windows.dll",
            "System.Xml.dll",
            "System.Xml.Linq.dll",
            "System.Xml.ReaderWriter.dll",
            "System.Xml.Serialization.dll",
            "System.Xml.XDocument.dll",
            "System.Xml.XmlDocument.dll",
            "System.Xml.XmlSerializer.dll",
            "System.Xml.XPath.dll",
            "System.Xml.XPath.XDocument.dll",
            "WindowsBase.dll",
            "mscorlib.dll",
            "netstandard.dll"
        };

        var refs = dllFiles.Select(x => MetadataReference.CreateFromFile(
            Path.Combine(refPath, x))).ToList();
        
        var compilation = CSharpCompilation.Create(
            buildOptions.Assembly,
            options: compilationOptions,
            syntaxTrees: syntaxTrees,
            references: refs);

        var outFile = new FileInfo(Path.Combine(outPath.FullName, $"{buildOptions.Assembly}.dll"));

        using var stream = File.OpenWrite(outFile.FullName);

        var result = compilation.Emit(stream);

        foreach (var diagnostic in result.Diagnostics)
        {
            if (diagnostic.Severity == DiagnosticSeverity.Error)
            {
                AnsiConsole.MarkupLine($"[red]{diagnostic}[/]");
            }
            else if (diagnostic.Severity == DiagnosticSeverity.Warning)
            {
                AnsiConsole.MarkupLine($"[yellow]{diagnostic}[/]");
            }
            else
            {
                if (!buildOptions.Verbose)
                {
                    continue;
                }

                AnsiConsole.WriteLine(diagnostic.ToString());
            }

            Logger.Log(diagnostic.ToString());
        }
        //Console.ResetColor();

        if (!result.Success)
            throw new Exception("Compilation failed");

        return outFile;
    }
}
