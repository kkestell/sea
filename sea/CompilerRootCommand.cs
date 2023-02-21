using System.CommandLine;

namespace DFlat;

internal class CompilerRootCommand : RootCommand
{
    public CompilerRootCommand() : base("Sea")
    {
        AddCommand(new BuildCommand());
        AddCommand(new RunCommand());
    }
}