﻿using Sea.Commands.Build;
using Sea.Commands.Generate;
using Sea.Commands.Run;

namespace Sea.Compilation.Stages.ILGeneration;

internal class ILGeneratorOptions
{
    public ILGeneratorOptions(BuildOptions buildOptions)
    {
        Verbosity = buildOptions.Verbosity;
        InputFiles = buildOptions.InputFiles;
        Assembly = buildOptions.Assembly;
        OptimizationMode = buildOptions.OptimizationMode;
        ILFile = buildOptions.ILFile;
    }

    public ILGeneratorOptions(RunOptions runOptions)
    {
        Verbosity = runOptions.Verbosity;
        InputFiles = runOptions.InputFiles;
        Assembly = runOptions.Assembly;
        OptimizationMode = runOptions.OptimizationMode;
        ILFile = runOptions.ILFile;
    }

    public ILGeneratorOptions(GenerateOptions generateOptions)
    {
        Verbosity = generateOptions.Verbosity;
        InputFiles = generateOptions.InputFiles;
        Assembly = generateOptions.Assembly;
        OptimizationMode = generateOptions.OptimizationMode;
        ILFile = generateOptions.OutputFile;
    }
    
    public VerbosityLevel Verbosity { get; }

    public IEnumerable<FileInfo> InputFiles { get; }

    public string Assembly { get; }

    public OptimizationMode OptimizationMode { get; }
    
    public FileInfo ILFile { get; }
}
