#region

using System.CommandLine;

#endregion

namespace Sea;

internal class CompilerRootCommand : RootCommand
{
    public CompilerRootCommand() : base("Sea")
    {
        AddCommand(new BuildCommand());
        AddCommand(new RunCommand());
    }
}