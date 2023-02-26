#region

using System.CommandLine.Builder;
using System.CommandLine.Parsing;

#endregion

namespace Sea;

internal class Program
{
    private static int Main(string[] args) =>
        new CommandLineBuilder(new CompilerRootCommand())
            .UseVersionOption("--version", "-v")
            .UseParseErrorReporting()
            .UseHelp()
            .UseTypoCorrections()
            .Build()
            .Invoke(args);
}
