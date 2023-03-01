using System.CommandLine;
using Sea.Commands.Build;
using Sea.Commands.Generate;
using Sea.Commands.Run;

namespace Sea.Commands;

internal class CompilerRootCommand : RootCommand
{
    public CompilerRootCommand() : base("Sea")
    {
        AddCommand(new GenerateCommand());
        AddCommand(new BuildCommand());
        AddCommand(new RunCommand());
    }
}