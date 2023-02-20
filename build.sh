#!/usr/bin/env bash
set -euo

if [ ! -d 'sdk' ]; then
    mkdir sdk
    curl -L https://aka.ms/dotnet/8.0.1xx/daily/dotnet-sdk-linux-x64.tar.gz | tar -xz -C ./sdk
fi

export DOTNET_ROOT="/sea/sdk"
export PATH="$DOTNET_ROOT:$PATH"

if [ ! -d '.nuget' ]; then
    export RestorePackagesPath="/sea/.nuget/packages"
    dotnet restore sea/sea.csproj
fi

pushd sea

REF_PATH='/sea/sdk/packs/Microsoft.NETCore.App.Ref/8.0.0-preview.2.23116.1/ref/net8.0'
ILC_PATH='/sea/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1'

rm -rf obj
rm sea sea.dll sea.o sea.pdb &> /dev/null || true

/sea/sdk/dotnet exec \
    "/sea/sdk/sdk/8.0.100-preview.2.23117.18/Roslyn/bincore/csc.dll" \
    /noconfig \
    /unsafe- \
    /checked- \
    "/nowarn:1701,1702,IL2121,1701,1702" \
    /fullpaths \
    /nostdlib+ \
    /platform:x64 \
    /errorreport:prompt \
    /warn:8 \
    "/define:TRACE;DEBUG;NET;NET8_0;NETCOREAPP;NET5_0_OR_GREATER;NET6_0_OR_GREATER;NET7_0_OR_GREATER;NET8_0_OR_GREATER;NETCOREAPP1_0_OR_GREATER;NETCOREAPP1_1_OR_GREATER;NETCOREAPP2_0_OR_GREATER;NETCOREAPP2_1_OR_GREATER;NETCOREAPP2_2_OR_GREATER;NETCOREAPP3_0_OR_GREATER;NETCOREAPP3_1_OR_GREATER" \
    /highentropyva+ \
    /nullable:enable \
    "/reference:$REF_PATH/Microsoft.CSharp.dll" \
    "/reference:$REF_PATH/Microsoft.VisualBasic.Core.dll" \
    "/reference:$REF_PATH/Microsoft.VisualBasic.dll" \
    "/reference:$REF_PATH/Microsoft.Win32.Primitives.dll" \
    "/reference:$REF_PATH/Microsoft.Win32.Registry.dll" \
    "/reference:$REF_PATH/mscorlib.dll" \
    "/reference:$REF_PATH/netstandard.dll" \
    "/reference:$REF_PATH/System.AppContext.dll" \
    "/reference:$REF_PATH/System.Buffers.dll" \
    "/reference:$REF_PATH/System.Collections.Concurrent.dll" \
    "/reference:$REF_PATH/System.Collections.dll" \
    "/reference:$REF_PATH/System.Collections.Immutable.dll" \
    "/reference:$REF_PATH/System.Collections.NonGeneric.dll" \
    "/reference:$REF_PATH/System.Collections.Specialized.dll" \
    "/reference:$REF_PATH/System.ComponentModel.Annotations.dll" \
    "/reference:$REF_PATH/System.ComponentModel.DataAnnotations.dll" \
    "/reference:$REF_PATH/System.ComponentModel.dll" \
    "/reference:$REF_PATH/System.ComponentModel.EventBasedAsync.dll" \
    "/reference:$REF_PATH/System.ComponentModel.Primitives.dll" \
    "/reference:$REF_PATH/System.ComponentModel.TypeConverter.dll" \
    "/reference:$REF_PATH/System.Configuration.dll" \
    "/reference:$REF_PATH/System.Console.dll" \
    "/reference:$REF_PATH/System.Core.dll" \
    "/reference:$REF_PATH/System.Data.Common.dll" \
    "/reference:$REF_PATH/System.Data.DataSetExtensions.dll" \
    "/reference:$REF_PATH/System.Data.dll" \
    "/reference:$REF_PATH/System.Diagnostics.Contracts.dll" \
    "/reference:$REF_PATH/System.Diagnostics.Debug.dll" \
    "/reference:$REF_PATH/System.Diagnostics.DiagnosticSource.dll" \
    "/reference:$REF_PATH/System.Diagnostics.FileVersionInfo.dll" \
    "/reference:$REF_PATH/System.Diagnostics.Process.dll" \
    "/reference:$REF_PATH/System.Diagnostics.StackTrace.dll" \
    "/reference:$REF_PATH/System.Diagnostics.TextWriterTraceListener.dll" \
    "/reference:$REF_PATH/System.Diagnostics.Tools.dll" \
    "/reference:$REF_PATH/System.Diagnostics.TraceSource.dll" \
    "/reference:$REF_PATH/System.Diagnostics.Tracing.dll" \
    "/reference:$REF_PATH/System.dll" \
    "/reference:$REF_PATH/System.Drawing.dll" \
    "/reference:$REF_PATH/System.Drawing.Primitives.dll" \
    "/reference:$REF_PATH/System.Dynamic.Runtime.dll" \
    "/reference:$REF_PATH/System.Formats.Asn1.dll" \
    "/reference:$REF_PATH/System.Formats.Tar.dll" \
    "/reference:$REF_PATH/System.Globalization.Calendars.dll" \
    "/reference:$REF_PATH/System.Globalization.dll" \
    "/reference:$REF_PATH/System.Globalization.Extensions.dll" \
    "/reference:$REF_PATH/System.IO.Compression.Brotli.dll" \
    "/reference:$REF_PATH/System.IO.Compression.dll" \
    "/reference:$REF_PATH/System.IO.Compression.FileSystem.dll" \
    "/reference:$REF_PATH/System.IO.Compression.ZipFile.dll" \
    "/reference:$REF_PATH/System.IO.dll" \
    "/reference:$REF_PATH/System.IO.FileSystem.AccessControl.dll" \
    "/reference:$REF_PATH/System.IO.FileSystem.dll" \
    "/reference:$REF_PATH/System.IO.FileSystem.DriveInfo.dll" \
    "/reference:$REF_PATH/System.IO.FileSystem.Primitives.dll" \
    "/reference:$REF_PATH/System.IO.FileSystem.Watcher.dll" \
    "/reference:$REF_PATH/System.IO.IsolatedStorage.dll" \
    "/reference:$REF_PATH/System.IO.MemoryMappedFiles.dll" \
    "/reference:$REF_PATH/System.IO.Pipes.AccessControl.dll" \
    "/reference:$REF_PATH/System.IO.Pipes.dll" \
    "/reference:$REF_PATH/System.IO.UnmanagedMemoryStream.dll" \
    "/reference:$REF_PATH/System.Linq.dll" \
    "/reference:$REF_PATH/System.Linq.Expressions.dll" \
    "/reference:$REF_PATH/System.Linq.Parallel.dll" \
    "/reference:$REF_PATH/System.Linq.Queryable.dll" \
    "/reference:$REF_PATH/System.Memory.dll" \
    "/reference:$REF_PATH/System.Net.dll" \
    "/reference:$REF_PATH/System.Net.Http.dll" \
    "/reference:$REF_PATH/System.Net.Http.Json.dll" \
    "/reference:$REF_PATH/System.Net.HttpListener.dll" \
    "/reference:$REF_PATH/System.Net.Mail.dll" \
    "/reference:$REF_PATH/System.Net.NameResolution.dll" \
    "/reference:$REF_PATH/System.Net.NetworkInformation.dll" \
    "/reference:$REF_PATH/System.Net.Ping.dll" \
    "/reference:$REF_PATH/System.Net.Primitives.dll" \
    "/reference:$REF_PATH/System.Net.Quic.dll" \
    "/reference:$REF_PATH/System.Net.Requests.dll" \
    "/reference:$REF_PATH/System.Net.Security.dll" \
    "/reference:$REF_PATH/System.Net.ServicePoint.dll" \
    "/reference:$REF_PATH/System.Net.Sockets.dll" \
    "/reference:$REF_PATH/System.Net.WebClient.dll" \
    "/reference:$REF_PATH/System.Net.WebHeaderCollection.dll" \
    "/reference:$REF_PATH/System.Net.WebProxy.dll" \
    "/reference:$REF_PATH/System.Net.WebSockets.Client.dll" \
    "/reference:$REF_PATH/System.Net.WebSockets.dll" \
    "/reference:$REF_PATH/System.Numerics.dll" \
    "/reference:$REF_PATH/System.Numerics.Vectors.dll" \
    "/reference:$REF_PATH/System.ObjectModel.dll" \
    "/reference:$REF_PATH/System.Reflection.DispatchProxy.dll" \
    "/reference:$REF_PATH/System.Reflection.dll" \
    "/reference:$REF_PATH/System.Reflection.Emit.dll" \
    "/reference:$REF_PATH/System.Reflection.Emit.ILGeneration.dll" \
    "/reference:$REF_PATH/System.Reflection.Emit.Lightweight.dll" \
    "/reference:$REF_PATH/System.Reflection.Extensions.dll" \
    "/reference:$REF_PATH/System.Reflection.Metadata.dll" \
    "/reference:$REF_PATH/System.Reflection.Primitives.dll" \
    "/reference:$REF_PATH/System.Reflection.TypeExtensions.dll" \
    "/reference:$REF_PATH/System.Resources.Reader.dll" \
    "/reference:$REF_PATH/System.Resources.ResourceManager.dll" \
    "/reference:$REF_PATH/System.Resources.Writer.dll" \
    "/reference:$REF_PATH/System.Runtime.CompilerServices.Unsafe.dll" \
    "/reference:$REF_PATH/System.Runtime.CompilerServices.VisualC.dll" \
    "/reference:$REF_PATH/System.Runtime.dll" \
    "/reference:$REF_PATH/System.Runtime.Extensions.dll" \
    "/reference:$REF_PATH/System.Runtime.Handles.dll" \
    "/reference:$REF_PATH/System.Runtime.InteropServices.dll" \
    "/reference:$REF_PATH/System.Runtime.InteropServices.JavaScript.dll" \
    "/reference:$REF_PATH/System.Runtime.InteropServices.RuntimeInformation.dll" \
    "/reference:$REF_PATH/System.Runtime.Intrinsics.dll" \
    "/reference:$REF_PATH/System.Runtime.Loader.dll" \
    "/reference:$REF_PATH/System.Runtime.Numerics.dll" \
    "/reference:$REF_PATH/System.Runtime.Serialization.dll" \
    "/reference:$REF_PATH/System.Runtime.Serialization.Formatters.dll" \
    "/reference:$REF_PATH/System.Runtime.Serialization.Json.dll" \
    "/reference:$REF_PATH/System.Runtime.Serialization.Primitives.dll" \
    "/reference:$REF_PATH/System.Runtime.Serialization.Xml.dll" \
    "/reference:$REF_PATH/System.Security.AccessControl.dll" \
    "/reference:$REF_PATH/System.Security.Claims.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.Algorithms.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.Cng.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.Csp.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.Encoding.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.OpenSsl.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.Primitives.dll" \
    "/reference:$REF_PATH/System.Security.Cryptography.X509Certificates.dll" \
    "/reference:$REF_PATH/System.Security.dll" \
    "/reference:$REF_PATH/System.Security.Principal.dll" \
    "/reference:$REF_PATH/System.Security.Principal.Windows.dll" \
    "/reference:$REF_PATH/System.Security.SecureString.dll" \
    "/reference:$REF_PATH/System.ServiceModel.Web.dll" \
    "/reference:$REF_PATH/System.ServiceProcess.dll" \
    "/reference:$REF_PATH/System.Text.Encoding.CodePages.dll" \
    "/reference:$REF_PATH/System.Text.Encoding.dll" \
    "/reference:$REF_PATH/System.Text.Encoding.Extensions.dll" \
    "/reference:$REF_PATH/System.Text.Encodings.Web.dll" \
    "/reference:$REF_PATH/System.Text.Json.dll" \
    "/reference:$REF_PATH/System.Text.RegularExpressions.dll" \
    "/reference:$REF_PATH/System.Threading.Channels.dll" \
    "/reference:$REF_PATH/System.Threading.dll" \
    "/reference:$REF_PATH/System.Threading.Overlapped.dll" \
    "/reference:$REF_PATH/System.Threading.Tasks.Dataflow.dll" \
    "/reference:$REF_PATH/System.Threading.Tasks.dll" \
    "/reference:$REF_PATH/System.Threading.Tasks.Extensions.dll" \
    "/reference:$REF_PATH/System.Threading.Tasks.Parallel.dll" \
    "/reference:$REF_PATH/System.Threading.Thread.dll" \
    "/reference:$REF_PATH/System.Threading.ThreadPool.dll" \
    "/reference:$REF_PATH/System.Threading.Timer.dll" \
    "/reference:$REF_PATH/System.Transactions.dll" \
    "/reference:$REF_PATH/System.Transactions.Local.dll" \
    "/reference:$REF_PATH/System.ValueTuple.dll" \
    "/reference:$REF_PATH/System.Web.dll" \
    "/reference:$REF_PATH/System.Web.HttpUtility.dll" \
    "/reference:$REF_PATH/System.Windows.dll" \
    "/reference:$REF_PATH/System.Xml.dll" \
    "/reference:$REF_PATH/System.Xml.Linq.dll" \
    "/reference:$REF_PATH/System.Xml.ReaderWriter.dll" \
    "/reference:$REF_PATH/System.Xml.Serialization.dll" \
    "/reference:$REF_PATH/System.Xml.XDocument.dll" \
    "/reference:$REF_PATH/System.Xml.XmlDocument.dll" \
    "/reference:$REF_PATH/System.Xml.XmlSerializer.dll" \
    "/reference:$REF_PATH/System.Xml.XPath.dll" \
    "/reference:$REF_PATH/System.Xml.XPath.XDocument.dll" \
    "/reference:$REF_PATH/WindowsBase.dll" \
    /debug+ \
    /debug:portable \
    /filealign:512 \
    /optimize- \
    /out:sea.dll \
    /target:exe \
    /warnaserror- \
    /utf8output \
    /deterministic+ \
    /warnaserror+:NU1605,SYSLIB0011 \
    Program.cs

"/sea/.nuget/packages/runtime.linux-x64.microsoft.dotnet.ilcompiler/8.0.0-preview.2.23116.1/tools/ilc" \
    sea.dll \
    -o:sea.o \
    "-r:$ILC_PATH/framework/WindowsBase.dll" \
    "-r:$ILC_PATH/framework/Microsoft.CSharp.dll" \
    "-r:$ILC_PATH/framework/Microsoft.VisualBasic.Core.dll" \
    "-r:$ILC_PATH/framework/Microsoft.VisualBasic.dll" \
    "-r:$ILC_PATH/framework/Microsoft.Win32.Primitives.dll" \
    "-r:$ILC_PATH/framework/Microsoft.Win32.Registry.dll" \
    "-r:$ILC_PATH/framework/mscorlib.dll" \
    "-r:$ILC_PATH/framework/netstandard.dll" \
    "-r:$ILC_PATH/framework/System.AppContext.dll" \
    "-r:$ILC_PATH/framework/System.Buffers.dll" \
    "-r:$ILC_PATH/framework/System.Collections.Concurrent.dll" \
    "-r:$ILC_PATH/framework/System.Collections.dll" \
    "-r:$ILC_PATH/framework/System.Collections.Immutable.dll" \
    "-r:$ILC_PATH/framework/System.Collections.NonGeneric.dll" \
    "-r:$ILC_PATH/framework/System.Collections.Specialized.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.Annotations.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.DataAnnotations.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.EventBasedAsync.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.ComponentModel.TypeConverter.dll" \
    "-r:$ILC_PATH/framework/System.Configuration.dll" \
    "-r:$ILC_PATH/framework/System.Console.dll" \
    "-r:$ILC_PATH/framework/System.Core.dll" \
    "-r:$ILC_PATH/framework/System.Data.Common.dll" \
    "-r:$ILC_PATH/framework/System.Data.DataSetExtensions.dll" \
    "-r:$ILC_PATH/framework/System.Data.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.Contracts.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.Debug.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.DiagnosticSource.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.FileVersionInfo.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.Process.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.StackTrace.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.TextWriterTraceListener.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.Tools.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.TraceSource.dll" \
    "-r:$ILC_PATH/framework/System.Diagnostics.Tracing.dll" \
    "-r:$ILC_PATH/framework/System.dll" \
    "-r:$ILC_PATH/framework/System.Drawing.dll" \
    "-r:$ILC_PATH/framework/System.Drawing.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.Dynamic.Runtime.dll" \
    "-r:$ILC_PATH/framework/System.Formats.Asn1.dll" \
    "-r:$ILC_PATH/framework/System.Formats.Tar.dll" \
    "-r:$ILC_PATH/framework/System.Globalization.Calendars.dll" \
    "-r:$ILC_PATH/framework/System.Globalization.dll" \
    "-r:$ILC_PATH/framework/System.Globalization.Extensions.dll" \
    "-r:$ILC_PATH/framework/System.IO.Compression.Brotli.dll" \
    "-r:$ILC_PATH/framework/System.IO.Compression.dll" \
    "-r:$ILC_PATH/framework/System.IO.Compression.FileSystem.dll" \
    "-r:$ILC_PATH/framework/System.IO.Compression.ZipFile.dll" \
    "-r:$ILC_PATH/framework/System.IO.dll" \
    "-r:$ILC_PATH/framework/System.IO.FileSystem.AccessControl.dll" \
    "-r:$ILC_PATH/framework/System.IO.FileSystem.dll" \
    "-r:$ILC_PATH/framework/System.IO.FileSystem.DriveInfo.dll" \
    "-r:$ILC_PATH/framework/System.IO.FileSystem.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.IO.FileSystem.Watcher.dll" \
    "-r:$ILC_PATH/framework/System.IO.IsolatedStorage.dll" \
    "-r:$ILC_PATH/framework/System.IO.MemoryMappedFiles.dll" \
    "-r:$ILC_PATH/framework/System.IO.Pipes.AccessControl.dll" \
    "-r:$ILC_PATH/framework/System.IO.Pipes.dll" \
    "-r:$ILC_PATH/framework/System.IO.UnmanagedMemoryStream.dll" \
    "-r:$ILC_PATH/framework/System.Linq.dll" \
    "-r:$ILC_PATH/framework/System.Linq.Expressions.dll" \
    "-r:$ILC_PATH/framework/System.Linq.Parallel.dll" \
    "-r:$ILC_PATH/framework/System.Linq.Queryable.dll" \
    "-r:$ILC_PATH/framework/System.Memory.dll" \
    "-r:$ILC_PATH/framework/System.Net.dll" \
    "-r:$ILC_PATH/framework/System.Net.Http.dll" \
    "-r:$ILC_PATH/framework/System.Net.Http.Json.dll" \
    "-r:$ILC_PATH/framework/System.Net.HttpListener.dll" \
    "-r:$ILC_PATH/framework/System.Net.Mail.dll" \
    "-r:$ILC_PATH/framework/System.Net.NameResolution.dll" \
    "-r:$ILC_PATH/framework/System.Net.NetworkInformation.dll" \
    "-r:$ILC_PATH/framework/System.Net.Ping.dll" \
    "-r:$ILC_PATH/framework/System.Net.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.Net.Quic.dll" \
    "-r:$ILC_PATH/framework/System.Net.Requests.dll" \
    "-r:$ILC_PATH/framework/System.Net.Security.dll" \
    "-r:$ILC_PATH/framework/System.Net.ServicePoint.dll" \
    "-r:$ILC_PATH/framework/System.Net.Sockets.dll" \
    "-r:$ILC_PATH/framework/System.Net.WebClient.dll" \
    "-r:$ILC_PATH/framework/System.Net.WebHeaderCollection.dll" \
    "-r:$ILC_PATH/framework/System.Net.WebProxy.dll" \
    "-r:$ILC_PATH/framework/System.Net.WebSockets.Client.dll" \
    "-r:$ILC_PATH/framework/System.Net.WebSockets.dll" \
    "-r:$ILC_PATH/framework/System.Numerics.dll" \
    "-r:$ILC_PATH/framework/System.Numerics.Vectors.dll" \
    "-r:$ILC_PATH/framework/System.ObjectModel.dll" \
    "-r:$ILC_PATH/framework/System.Private.DataContractSerialization.dll" \
    "-r:$ILC_PATH/framework/System.Private.Uri.dll" \
    "-r:$ILC_PATH/framework/System.Private.Xml.dll" \
    "-r:$ILC_PATH/framework/System.Private.Xml.Linq.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.DispatchProxy.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Emit.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Emit.ILGeneration.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Emit.Lightweight.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Extensions.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Metadata.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.Reflection.TypeExtensions.dll" \
    "-r:$ILC_PATH/framework/System.Resources.Reader.dll" \
    "-r:$ILC_PATH/framework/System.Resources.ResourceManager.dll" \
    "-r:$ILC_PATH/framework/System.Resources.Writer.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.CompilerServices.Unsafe.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.CompilerServices.VisualC.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Extensions.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Handles.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.InteropServices.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.InteropServices.JavaScript.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.InteropServices.RuntimeInformation.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Intrinsics.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Loader.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Numerics.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Serialization.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Serialization.Formatters.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Serialization.Json.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Serialization.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.Runtime.Serialization.Xml.dll" \
    "-r:$ILC_PATH/framework/System.Security.AccessControl.dll" \
    "-r:$ILC_PATH/framework/System.Security.Claims.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.Algorithms.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.Cng.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.Csp.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.Encoding.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.OpenSsl.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.Primitives.dll" \
    "-r:$ILC_PATH/framework/System.Security.Cryptography.X509Certificates.dll" \
    "-r:$ILC_PATH/framework/System.Security.dll" \
    "-r:$ILC_PATH/framework/System.Security.Principal.dll" \
    "-r:$ILC_PATH/framework/System.Security.Principal.Windows.dll" \
    "-r:$ILC_PATH/framework/System.Security.SecureString.dll" \
    "-r:$ILC_PATH/framework/System.ServiceModel.Web.dll" \
    "-r:$ILC_PATH/framework/System.ServiceProcess.dll" \
    "-r:$ILC_PATH/framework/System.Text.Encoding.CodePages.dll" \
    "-r:$ILC_PATH/framework/System.Text.Encoding.dll" \
    "-r:$ILC_PATH/framework/System.Text.Encoding.Extensions.dll" \
    "-r:$ILC_PATH/framework/System.Text.Encodings.Web.dll" \
    "-r:$ILC_PATH/framework/System.Text.Json.dll" \
    "-r:$ILC_PATH/framework/System.Text.RegularExpressions.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Channels.dll" \
    "-r:$ILC_PATH/framework/System.Threading.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Overlapped.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Tasks.Dataflow.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Tasks.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Tasks.Extensions.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Tasks.Parallel.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Thread.dll" \
    "-r:$ILC_PATH/framework/System.Threading.ThreadPool.dll" \
    "-r:$ILC_PATH/framework/System.Threading.Timer.dll" \
    "-r:$ILC_PATH/framework/System.Transactions.dll" \
    "-r:$ILC_PATH/framework/System.Transactions.Local.dll" \
    "-r:$ILC_PATH/framework/System.ValueTuple.dll" \
    "-r:$ILC_PATH/framework/System.Web.dll" \
    "-r:$ILC_PATH/framework/System.Web.HttpUtility.dll" \
    "-r:$ILC_PATH/framework/System.Windows.dll" \
    "-r:$ILC_PATH/framework/System.Xml.dll" \
    "-r:$ILC_PATH/framework/System.Xml.Linq.dll" \
    "-r:$ILC_PATH/framework/System.Xml.ReaderWriter.dll" \
    "-r:$ILC_PATH/framework/System.Xml.Serialization.dll" \
    "-r:$ILC_PATH/framework/System.Xml.XDocument.dll" \
    "-r:$ILC_PATH/framework/System.Xml.XmlDocument.dll" \
    "-r:$ILC_PATH/framework/System.Xml.XmlSerializer.dll" \
    "-r:$ILC_PATH/framework/System.Xml.XPath.dll" \
    "-r:$ILC_PATH/framework/System.Xml.XPath.XDocument.dll" \
    "-r:$ILC_PATH/framework/WindowsBase.dll" \
    "-r:$ILC_PATH/sdk/System.Private.CoreLib.dll" \
    "-r:$ILC_PATH/sdk/System.Private.DisabledReflection.dll" \
    "-r:$ILC_PATH/sdk/System.Private.Reflection.Execution.dll" \
    "-r:$ILC_PATH/sdk/System.Private.StackTraceMetadata.dll" \
    "-r:$ILC_PATH/sdk/System.Private.TypeLoader.dll" \
    --targetos:linux \
    --targetarch:x64 \
    --dehydrate \
    -g \
    --initassembly:System.Private.CoreLib \
    --initassembly:System.Private.StackTraceMetadata \
    --initassembly:System.Private.TypeLoader \
    --initassembly:System.Private.Reflection.Execution \
    --appcontextswitch:Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability=true \
    --appcontextswitch:System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization=false \
    --appcontextswitch:System.Diagnostics.Tracing.EventSource.IsSupported=false \
    --appcontextswitch:System.Resources.ResourceManager.AllowCustomResourceTypes=false \
    --appcontextswitch:System.Runtime.InteropServices.BuiltInComInterop.IsSupported=false \
    --appcontextswitch:System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting=false \
    --appcontextswitch:System.Runtime.InteropServices.EnableCppCLIHostActivation=false \
    --appcontextswitch:System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization=false \
    --appcontextswitch:System.StartupHookProvider.IsSupported=false \
    --appcontextswitch:System.Threading.Thread.EnableAutoreleasePool=false \
    --appcontextswitch:System.Text.Encoding.EnableUnsafeUTF7Encoding=false \
    --appcontextswitch:RUNTIME_IDENTIFIER=linux-x64 \
    --directpinvoke:libSystem.Native \
    --directpinvoke:libSystem.Globalization.Native \
    --directpinvoke:libSystem.IO.Compression.Native \
    --directpinvoke:libSystem.Net.Security.Native \
    --directpinvoke:libSystem.Security.Cryptography.Native.OpenSsl \
    --feature:Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability=true \
    --feature:System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization=false \
    --feature:System.Diagnostics.Tracing.EventSource.IsSupported=false \
    --feature:System.Resources.ResourceManager.AllowCustomResourceTypes=false \
    --feature:System.Runtime.InteropServices.BuiltInComInterop.IsSupported=false \
    --feature:System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting=false \
    --feature:System.Runtime.InteropServices.EnableCppCLIHostActivation=false \
    --feature:System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization=false \
    --feature:System.StartupHookProvider.IsSupported=false \
    --feature:System.Threading.Thread.EnableAutoreleasePool=false \
    --feature:System.Text.Encoding.EnableUnsafeUTF7Encoding=false \
    --stacktracedata \
    --scanreflection \
    --nowarn:"1701;1702;IL2121;1701;1702" \
    --singlewarn \
    --root:sea.dll \
    --nosinglewarnassembly:sea \
    --resilient \
    --feature:System.Linq.Expressions.CanCompileToIL=false \
    --feature:System.Linq.Expressions.CanEmitObjectArrayDelegate=false \
    --feature:System.Linq.Expressions.CanCreateArbitraryDelegates=false

clang sea.o \
    -o sea \
    "$ILC_PATH/sdk/libbootstrapper.a" \
    "$ILC_PATH/sdk/libRuntime.WorkstationGC.a" \
    "$ILC_PATH/sdk/libeventpipe-disabled.a" \
    "$ILC_PATH/sdk/libstdc++compat.a" \
    "$ILC_PATH/sdk/libnumasupportdynamic.a" \
    "$ILC_PATH/framework/libSystem.Native.a" \
    "$ILC_PATH/framework/libSystem.Globalization.Native.a" \
    "$ILC_PATH/framework/libSystem.IO.Compression.Native.a" \
    "$ILC_PATH/framework/libSystem.Net.Security.Native.a" \
    "$ILC_PATH/framework/libSystem.Security.Cryptography.Native.OpenSsl.a" \
    -g \
    -Wl,-rpath,'$ORIGIN' \
    -Wl,--build-id=sha1 \
    -Wl,--as-needed \
    -pthread \
    -ldl \
    -lz \
    -lrt \
    -lm \
    -pie \
    -Wl,-pie \
    -Wl,-z,relro \
    -Wl,-z,now \
    -Wl,--discard-all \
    -Wl,--gc-sections

./sea

popd