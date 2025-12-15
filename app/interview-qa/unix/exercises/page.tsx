// app/exercises/unix/page.tsx
"use client";

import { useState } from "react";
import {
  Terminal,
  Search,
  Play,
  CheckCircle,
  XCircle,
  HelpCircle,
  Code,
  FileText,
  Folder,
  Users,
  Shield,
  Network,
  Cpu,
  HardDrive,
  Clock,
  Star,
  Trophy,
  ChevronDown,
  ChevronUp,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";

interface UnixExercise {
  id: string;
  title: string;
  description: string;
  objective: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  hints: string[];
  solution: string[];
  points: number;
  tags: string[];
  testCommand?: string;
  expectedOutput?: string;
}

const UnixExercisesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedExercises, setExpandedExercises] = useState<string[]>(["ex1"]);
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});
  const [userAttempts, setUserAttempts] = useState<Record<string, number>>({});
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [userCode, setUserCode] = useState<Record<string, string>>({});

  // Unix Exercises Data
  const exercises: UnixExercise[] = [
    {
      id: "ex1",
      title: "File Navigation Challenge",
      description: "Navigate through directories and list files with specific criteria.",
      objective: "Navigate to the /tmp directory, list all files sorted by modification time, then return to your home directory.",
      difficulty: "Beginner",
      category: "File Operations",
      hints: [
        "Use cd to change directories",
        "Use ls with appropriate flags for sorting",
        "Use ~ to represent home directory",
      ],
      solution: [
        "cd /tmp",
        "ls -lt",
        "cd ~  # or just 'cd'",
      ],
      points: 10,
      tags: ["cd", "ls", "navigation"],
      testCommand: "pwd | grep -q '^/tmp$' && echo 'In /tmp directory'",
      expectedOutput: "In /tmp directory",
    },
    {
      id: "ex2",
      title: "File Creation & Management",
      description: "Create, copy, and organize files in a structured way.",
      objective: "1. Create a directory called 'practice'\n2. Create three empty files: file1.txt, file2.txt, file3.txt\n3. Copy file1.txt to backup.txt\n4. Rename file2.txt to document.txt",
      difficulty: "Beginner",
      category: "File Operations",
      hints: [
        "mkdir to create directory",
        "touch to create empty files",
        "cp to copy files",
        "mv to rename/move files",
      ],
      solution: [
        "mkdir practice",
        "cd practice",
        "touch file1.txt file2.txt file3.txt",
        "cp file1.txt backup.txt",
        "mv file2.txt document.txt",
      ],
      points: 15,
      tags: ["mkdir", "touch", "cp", "mv"],
    },
    {
      id: "ex3",
      title: "Text File Processing",
      description: "Use text processing commands to manipulate file contents.",
      objective: "Given a file 'data.txt' with multiple lines, extract lines containing 'ERROR', count them, and save to 'errors.txt'.",
      difficulty: "Intermediate",
      category: "Text Processing",
      hints: [
        "grep to search for patterns",
        "wc to count lines",
        "> to redirect output",
        "Use pipes to combine commands",
      ],
      solution: [
        "grep 'ERROR' data.txt > errors.txt",
        "wc -l errors.txt  # To count errors",
        "# Or in one line:",
        "grep -c 'ERROR' data.txt > error_count.txt",
      ],
      points: 20,
      tags: ["grep", "wc", "pipes", "redirection"],
    },
    {
      id: "ex4",
      title: "Permission Management",
      description: "Set and verify file permissions correctly.",
      objective: "Create a script.sh file and set permissions so that:\n1. Owner can read, write, execute\n2. Group can read and execute\n3. Others can only read",
      difficulty: "Intermediate",
      category: "Permissions",
      hints: [
        "chmod uses octal notation: r=4, w=2, x=1",
        "755 means rwxr-xr-x",
        "Check permissions with ls -l",
        "Create script with echo '#!/bin/bash' > script.sh",
      ],
      solution: [
        "echo '#!/bin/bash' > script.sh",
        "echo 'echo \"Hello World\"' >> script.sh",
        "chmod 755 script.sh",
        "# Verify:",
        "ls -l script.sh",
      ],
      points: 25,
      tags: ["chmod", "permissions", "scripts"],
    },
    {
      id: "ex5",
      title: "Process Management",
      description: "Monitor and control system processes.",
      objective: "1. Find all processes owned by your user\n2. Find process using port 8080\n3. Kill a process by PID",
      difficulty: "Intermediate",
      category: "Processes",
      hints: [
        "ps with user filter",
        "lsof for port checking",
        "kill to terminate processes",
        "Use grep to filter output",
      ],
      solution: [
        "ps -u $USER",
        "lsof -i :8080",
        "# To kill process with PID 1234:",
        "kill 1234",
        "# Force kill:",
        "kill -9 1234",
      ],
      points: 30,
      tags: ["ps", "lsof", "kill", "processes"],
    },
    {
      id: "ex6",
      title: "Find & Search Files",
      description: "Use find command with various criteria to locate files.",
      objective: "Find all .log files in /var/log that were modified in the last 7 days and are larger than 1MB.",
      difficulty: "Intermediate",
      category: "File Operations",
      hints: [
        "find with -name pattern",
        "-mtime for modification time",
        "-size for file size",
        "2>/dev/null to suppress permission errors",
      ],
      solution: [
        "find /var/log -name '*.log' -mtime -7 -size +1M 2>/dev/null",
        "# Human readable size:",
        "find /var/log -name '*.log' -mtime -7 -size +1M -exec ls -lh {} \\; 2>/dev/null",
      ],
      points: 25,
      tags: ["find", "search", "files"],
    },
    {
      id: "ex7",
      title: "Disk Usage Analysis",
      description: "Analyze disk usage and find large files.",
      objective: "Find the top 10 largest files in your home directory and calculate total disk usage.",
      difficulty: "Intermediate",
      category: "System",
      hints: [
        "du for disk usage",
        "sort to order by size",
        "head to limit results",
        "Use -h for human readable format",
      ],
      solution: [
        "# Top 10 largest files:",
        "du -ah ~ | sort -rh | head -10",
        "# Total disk usage:",
        "du -sh ~",
        "# Alternative with find:",
        "find ~ -type f -exec du -h {} \\; | sort -rh | head -10",
      ],
      points: 20,
      tags: ["du", "find", "disk", "sort"],
    },
    {
      id: "ex8",
      title: "Text Transformation with sed",
      description: "Use sed for advanced text transformations.",
      objective: "Replace all occurrences of 'old_version' with 'new_version' in all .txt files in current directory.",
      difficulty: "Advanced",
      category: "Text Processing",
      hints: [
        "sed for stream editing",
        "-i for in-place editing",
        "Use wildcard for multiple files",
        "Test without -i first",
      ],
      solution: [
        "# Test first:",
        "sed 's/old_version/new_version/g' *.txt",
        "# Apply changes:",
        "sed -i 's/old_version/new_version/g' *.txt",
        "# Backup original:",
        "sed -i.bak 's/old_version/new_version/g' *.txt",
      ],
      points: 35,
      tags: ["sed", "text", "transformation", "regex"],
    },
    {
      id: "ex9",
      title: "Data Extraction with awk",
      description: "Use awk to extract and process specific data columns.",
      objective: "From a CSV file 'data.csv', extract the 2nd and 5th columns where the 3rd column value is greater than 100.",
      difficulty: "Advanced",
      category: "Text Processing",
      hints: [
        "awk uses $1, $2, etc. for columns",
        "FS for field separator",
        "NR for line numbers",
        "Conditional statements in awk",
      ],
      solution: [
        "awk -F',' '$3 > 100 {print $2,$5}' data.csv",
        "# With header preservation:",
        "awk -F',' 'NR==1 || $3 > 100 {print $2,$5}' data.csv",
        "# Formatted output:",
        "awk -F',' '$3 > 100 {printf \"Name: %s, Value: %s\\n\", $2, $5}' data.csv",
      ],
      points: 40,
      tags: ["awk", "csv", "data", "extraction"],
    },
    {
      id: "ex10",
      title: "System Monitoring Script",
      description: "Create a comprehensive system monitoring script.",
      objective: "Create a script that displays:\n1. System uptime\n2. Memory usage\n3. Disk usage\n4. Top 5 processes by CPU",
      difficulty: "Advanced",
      category: "Scripting",
      hints: [
        "Use echo for output",
        "Command substitution with $()",
        "Format output with printf",
        "Add colors with escape sequences",
      ],
      solution: [
        "#!/bin/bash",
        "echo '=== System Monitoring ==='",
        "echo 'Uptime: $(uptime -p)'",
        "echo 'Memory: $(free -h | awk \'/^Mem:/ {print $3 \"/\" $2}\')'",
        "echo 'Disk: $(df -h / | awk \'NR==2 {print $5}\')'",
        "echo 'Top 5 CPU processes:'",
        "ps aux --sort=-%cpu | head -6",
      ],
      points: 50,
      tags: ["bash", "scripting", "monitoring", "automation"],
    },
    {
      id: "ex11",
      title: "Log Analysis Pipeline",
      description: "Create a pipeline to analyze web server logs.",
      objective: "From an access.log file, find the top 10 IP addresses with most requests and their request count.",
      difficulty: "Advanced",
      category: "Text Processing",
      hints: [
        "cut to extract columns",
        "sort | uniq -c for counting",
        "head for top results",
        "awk for formatting",
      ],
      solution: [
        "cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -10",
        "# With pretty output:",
        "cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -10 | awk '{printf \"%s\\t%s requests\\n\", $2, $1}'",
      ],
      points: 45,
      tags: ["logs", "analysis", "pipeline", "cut", "uniq"],
    },
    {
      id: "ex12",
      title: "Backup Automation",
      description: "Create an automated backup script with compression.",
      objective: "Create a script that backs up a directory, compresses it with timestamp, and removes backups older than 30 days.",
      difficulty: "Advanced",
      category: "Scripting",
      hints: [
        "tar for compression",
        "date for timestamps",
        "find with -mtime for old files",
        "cron for automation",
      ],
      solution: [
        "#!/bin/bash",
        "BACKUP_DIR=\"/backup\"",
        "SOURCE_DIR=\"/data\"",
        "DATE=$(date +%Y%m%d_%H%M%S)",
        "tar -czf \"$BACKUP_DIR/backup_$DATE.tar.gz\" \"$SOURCE_DIR\"",
        "# Clean old backups:",
        "find \"$BACKUP_DIR\" -name 'backup_*.tar.gz' -mtime +30 -delete",
        "# Add to crontab: 0 2 * * * /path/to/backup.sh",
      ],
      points: 60,
      tags: ["backup", "tar", "cron", "automation"],
    },
  ];

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All", "File Operations", "Text Processing", "Permissions", "Processes", "System", "Scripting"];

  // Filter exercises
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === "All" || exercise.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // Stats
  const stats = {
    total: exercises.length,
    beginner: exercises.filter(e => e.difficulty === "Beginner").length,
    intermediate: exercises.filter(e => e.difficulty === "Intermediate").length,
    advanced: exercises.filter(e => e.difficulty === "Advanced").length,
    completed: Object.values(completedExercises).filter(Boolean).length,
    totalPoints: exercises.reduce((sum, ex) => sum + ex.points, 0),
    earnedPoints: Object.keys(completedExercises).reduce((sum, id) => {
      const ex = exercises.find(e => e.id === id);
      return sum + (ex?.points || 0);
    }, 0),
  };

  // User actions
  const toggleExercise = (id: string) => {
    setExpandedExercises((prev) =>
      prev.includes(id)
        ? prev.filter((exId) => exId !== id)
        : [...prev, id]
    );
  };

  const toggleSolution = (id: string) => {
    setShowSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const attemptExercise = (id: string) => {
    setUserAttempts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const completeExercise = (id: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const resetExercise = (id: string) => {
    setUserAttempts((prev) => {
      const newAttempts = { ...prev };
      delete newAttempts[id];
      return newAttempts;
    });
    setCompletedExercises((prev) => {
      const newCompleted = { ...prev };
      delete newCompleted[id];
      return newCompleted;
    });
    setShowSolutions((prev) => {
      const newSolutions = { ...prev };
      delete newSolutions[id];
      return newSolutions;
    });
    setUserCode((prev) => {
      const newCode = { ...prev };
      delete newCode[id];
      return newCode;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-amber-100 text-amber-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "File Operations": return <Folder className="w-5 h-5" />;
      case "Text Processing": return <FileText className="w-5 h-5" />;
      case "Permissions": return <Shield className="w-5 h-5" />;
      case "Processes": return <Cpu className="w-5 h-5" />;
      case "System": return <HardDrive className="w-5 h-5" />;
      case "Scripting": return <Terminal className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Terminal className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Unix Exercises</h1>
                <p className="text-gray-600 mt-2">
                  Practice Unix commands with interactive exercises and real-world scenarios
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.earnedPoints} / {stats.totalPoints} pts
                </div>
                <div className="text-gray-600 text-sm">Points Earned</div>
              </div>
              <div className="h-10 w-px bg-gray-300" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.completed} / {stats.total}
                </div>
                <div className="text-gray-600 text-sm">Exercises Completed</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-gray-600 text-sm mt-1">Total Exercises</div>
                </div>
                <Target className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.beginner}</div>
                  <div className="text-gray-600 text-sm mt-1">Beginner</div>
                </div>
                <Play className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-amber-600">{stats.intermediate}</div>
                  <div className="text-gray-600 text-sm mt-1">Intermediate</div>
                </div>
                <Zap className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{stats.advanced}</div>
                  <div className="text-gray-600 text-sm mt-1">Advanced</div>
                </div>
                <Trophy className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search exercises by title, description, or tags..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-gray-600 text-sm">Common commands:</span>
              {["grep", "sed", "awk", "find", "chmod", "ps", "tar", "cron"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {filteredExercises.map((exercise) => {
            const isExpanded = expandedExercises.includes(exercise.id);
            const attempts = userAttempts[exercise.id] || 0;
            const isCompleted = completedExercises[exercise.id];
            const showSolution = showSolutions[exercise.id];

            return (
              <div
                key={exercise.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  isCompleted ? "border-green-300 shadow-green-100" : "border-gray-200"
                }`}
              >
                {/* Exercise Header */}
                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                      )}
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                              {exercise.difficulty}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {exercise.points} pts
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-gray-600">
                            {getCategoryIcon(exercise.category)}
                            <span className="text-sm">{exercise.category}</span>
                          </div>
                          {attempts > 0 && (
                            <span className="text-sm text-gray-500">
                              • Attempts: {attempts}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </button>

                {/* Exercise Content */}
                {isExpanded && (
                  <div className="px-6 pb-6">
                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Objective
                      </h4>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-gray-800 whitespace-pre-line">{exercise.objective}</p>
                      </div>
                    </div>

                    {/* Hints */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Hints ({exercise.hints.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exercise.hints.map((hint, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <p className="text-gray-700">{hint}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Try It Yourself */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        Try It Yourself
                      </h4>
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm mb-3">
                        <div className="text-green-400 mb-2"># Write your solution below, then test it:</div>
                        <textarea
                          className="w-full bg-gray-800 text-gray-100 p-3 rounded-lg font-mono text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Type your Unix commands here..."
                          value={userCode[exercise.id] || ""}
                          onChange={(e) => setUserCode(prev => ({
                            ...prev,
                            [exercise.id]: e.target.value
                          }))}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => attemptExercise(exercise.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Test Solution
                        </button>
                        <button
                          onClick={() => completeExercise(exercise.id)}
                          disabled={isCompleted}
                          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                            isCompleted
                              ? "bg-green-100 text-green-800"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {isCompleted ? "Completed" : "Mark as Complete"}
                        </button>
                        <button
                          onClick={() => toggleSolution(exercise.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                        >
                          {showSolution ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              Hide Solution
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              Show Solution
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => resetExercise(exercise.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 ml-auto"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Solution */}
                    {showSolution && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          Solution
                        </h4>
                        <div className="space-y-2">
                          {exercise.solution.map((line, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative group"
                            >
                              <span className="text-green-400">$ </span>
                              {line}
                              <button
                                onClick={() => copyToClipboard(line)}
                                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      {exercise.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredExercises.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <Terminal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No exercises found
              </h3>
              <p className="text-gray-500">
                Try a different search term or filter
              </p>
            </div>
          )}
        </div>

        {/* Practice Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Practice Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Test in Safe Environment</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Use virtual machines, containers, or dedicated practice directories to avoid accidental damage to important files.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Read Manual Pages</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Use <code className="text-sm bg-white px-1 rounded">man command</code> to understand all available options and flags.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Practice Command Combinations</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Combine commands with pipes (<code className="text-sm bg-white px-1 rounded">|</code>) to create powerful one-liners.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Use Tab Completion</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Press <kbd className="px-2 py-1 bg-white border rounded text-xs">Tab</kbd> to auto-complete file paths and command names.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Check Exit Codes</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Use <code className="text-sm bg-white px-1 rounded">echo $?</code> to check if the previous command succeeded (0 = success).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Learn Keyboard Shortcuts</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">Ctrl+C</kbd> to cancel,{' '}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">Ctrl+R</kbd> to search history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Progress Tracking</h4>
            <p className="text-gray-600 text-sm mt-2">
              Track your progress with points and completion status
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Difficulty Levels</h4>
            <p className="text-gray-600 text-sm mt-2">
              Start with beginner exercises and progress to advanced challenges
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Real-World Scenarios</h4>
            <p className="text-gray-600 text-sm mt-2">
              Practical exercises based on real system administration tasks
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Unix Exercises • {stats.total} exercises • {stats.totalPoints} total points</p>
          <p className="mt-2">Complete exercises to improve your Unix skills and earn points!</p>
        </div>
      </div>
    </div>
  );
};

export default UnixExercisesPage;