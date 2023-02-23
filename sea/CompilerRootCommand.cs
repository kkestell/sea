using System.CommandLine;

namespace Sea;

internal class CompilerRootCommand : RootCommand
{
    public CompilerRootCommand() : base("Sea")
    {
        AddCommand(new BuildCommand());
        AddCommand(new RunCommand());
    }
}