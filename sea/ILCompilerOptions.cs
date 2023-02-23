﻿namespace Sea;

internal class ILCompilerOptions
{
    public ILCompilerOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        Debug = buildOptions.Debug;
        OptimizationMode = buildOptions.OptimizationMode;
        Assembly = buildOptions.Assembly;
        Reflection = buildOptions.Reflection;
        StackTrace = buildOptions.StackTrace;
    }
    
    public VerbosityLevel Verbosity { get; }
    
    public bool Debug { get; }

    public OptimizationMode OptimizationMode { get; }

    public string Assembly { get; }

    public bool Reflection { get; }

    public bool StackTrace { get; }
}
