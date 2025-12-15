// app/interview/unix-commands/page.tsx
"use client";

import { useState } from "react";
import { Copy, ChevronDown, ChevronUp, Search, Terminal } from "lucide-react";

const UnixCommandsPage = () => {
  const [openSections, setOpenSections] = useState<string[]>([
    "basics",
    "file-operations",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Unix Q&A Data - Structured from Basic to Advanced
  const sections = [
    {
      id: "basics",
      title: "📚 Unix/Linux Basics - Must Know",
      level: "Beginner",
      questions: [
        {
          id: "b1",
          q: "What is Unix/Linux?",
          a: "Unix is a multi-user, multi-tasking operating system originally developed in the 1970s. Linux is a Unix-like operating system that's open-source and widely used in servers, cloud, and development environments.",
        },
        {
          id: "b2",
          q: "What is the difference between Unix and Linux?",
          a: "Unix is proprietary (with some open variants), while Linux is completely open-source. Linux is a kernel, not a complete OS, while Unix refers to a complete OS.",
        },
        {
          id: "b3",
          q: "What is the shell?",
          a: "A shell is a command-line interface that allows users to interact with the operating system by typing commands. Common shells include Bash (Bourne Again Shell), Zsh, and Ksh.",
        },
        {
          id: "b4",
          q: "How to check your current directory?",
          command: "pwd",
          a: "`pwd` (Print Working Directory) shows your current location in the filesystem.",
        },
        {
          id: "b5",
          q: "How to list files and directories?",
          command: "ls",
          a: "Basic listing: `ls`\nDetailed list: `ls -l`\nShow hidden files: `ls -a`\nSort by time: `ls -lrt`",
        },
        {
          id: "b6",
          q: "How to change directories?",
          command: "cd",
          a: "`cd /path/to/directory` - Go to specific directory\n`cd ..` - Go up one level\n`cd ~` or `cd` - Go to home directory\n`cd -` - Go to previous directory",
        },
        {
          id: "b7",
          q: "What are absolute and relative paths?",
          a: "Absolute path starts from root (/): `/home/user/file.txt`\nRelative path starts from current directory: `../folder/file.txt` or `./script.sh`",
        },
      ],
    },
    {
      id: "file-operations",
      title: "📁 File & Directory Operations",
      level: "Beginner",
      questions: [
        {
          id: "f1",
          q: "How to create a file?",
          command: "touch filename.txt",
          a: "`touch file.txt` creates an empty file. Also used to update file's timestamp.",
        },
        {
          id: "f2",
          q: "How to create a directory?",
          command: "mkdir folder_name",
          a: "`mkdir myfolder` - Create single directory\n`mkdir -p parent/child` - Create nested directories",
        },
        {
          id: "f3",
          q: "How to view file contents?",
          command: "cat filename",
          a: "`cat file.txt` - Display entire file\n`less file.txt` - View page by page\n`head -10 file.txt` - First 10 lines\n`tail -10 file.txt` - Last 10 lines",
        },
        {
          id: "f4",
          q: "How to copy files?",
          command: "cp source destination",
          a: "`cp file1.txt file2.txt` - Copy file\n`cp -r dir1 dir2` - Copy directory recursively",
        },
        {
          id: "f5",
          q: "How to move/rename files?",
          command: "mv oldname newname",
          a: "`mv old.txt new.txt` - Rename file\n`mv file.txt /path/` - Move file to directory",
        },
        {
          id: "f6",
          q: "How to delete files/directories?",
          command: "rm filename",
          a: "`rm file.txt` - Delete file\n`rm -r folder` - Delete directory recursively\n`rm -f file.txt` - Force delete without confirmation",
        },
        {
          id: "f7",
          q: "How to display the 10th line of a file?",
          command: "sed -n '10p' filename",
          a: "Multiple ways:\n1. `sed -n '10p' file.txt`\n2. `head -10 file.txt | tail -1`\n3. `awk 'NR==10' file.txt`",
        },
        {
          id: "f8",
          q: "How to remove header (first line) from a file?",
          command: "sed '1d' filename",
          a: "`sed '1d' file.txt` - Remove first line\n`sed -i '1d' file.txt` - Modify file in-place",
        },
      ],
    },
    {
      id: "permissions",
      title: "🔐 File Permissions & Ownership",
      level: "Intermediate",
      questions: [
        {
          id: "p1",
          q: "How to check file permissions?",
          command: "ls -l filename",
          a: "`ls -l` shows permissions like `-rwxr-xr--`\nFirst char: `-`=file, `d`=directory\nNext 9 chars: `rwx` (owner), `r-x` (group), `r--` (others)",
        },
        {
          id: "p2",
          q: "What does chmod 777 mean?",
          command: "chmod 777 filename",
          a: "`7` = read(4) + write(2) + execute(1)\nFirst 7: owner has all permissions\nSecond 7: group has all permissions\nThird 7: others have all permissions",
        },
        {
          id: "p3",
          q: "How to give execute permission to a script?",
          command: "chmod +x script.sh",
          a: "`chmod +x script.sh` - Add execute for all\n`chmod u+x script.sh` - Add execute for owner only",
        },
        {
          id: "p4",
          q: "How to change file owner?",
          command: "chown user:group filename",
          a: "`chown username file.txt` - Change owner\n`chown user:group file.txt` - Change owner and group\n`chown -R user:group /folder` - Recursively",
        },
      ],
    },
    {
      id: "text-processing",
      title: "✏️ Text Processing Commands",
      level: "Intermediate",
      questions: [
        {
          id: "t1",
          q: "How to search text in files?",
          command: "grep pattern filename",
          a: "`grep 'error' log.txt` - Find lines with 'error'\n`grep -i 'error'` - Case-insensitive\n`grep -r 'error' /dir` - Recursive search\n`grep -v 'success'` - Inverse match",
        },
        {
          id: "t2",
          q: "How to count lines, words, characters?",
          command: "wc filename",
          a: "`wc file.txt` shows: lines words characters\n`wc -l` - Only lines\n`wc -w` - Only words\n`wc -c` - Only characters",
        },
        {
          id: "t3",
          q: "How to extract columns from a file?",
          command: "cut -d',' -f1 filename",
          a: "`cut -d',' -f1,3 file.csv` - Extract 1st & 3rd columns\n`cut -c1-10 file.txt` - Extract characters 1-10",
        },
        {
          id: "t4",
          q: "How to sort and remove duplicates?",
          command: "sort filename | uniq",
          a: "`sort file.txt` - Sort lines\n`sort -u file.txt` - Sort and remove duplicates\n`uniq file.txt` - Remove consecutive duplicates",
        },
        {
          id: "t5",
          q: "How to find and replace text?",
          command: "sed 's/old/new/g' filename",
          a: "`sed 's/foo/bar/g' file.txt` - Replace all occurrences\n`sed 's/foo/bar/2'` - Replace 2nd occurrence only\n`sed -i 's/old/new/' file.txt` - In-place edit",
        },
        {
          id: "t6",
          q: "How to display last word from each line?",
          command: "awk '{print $NF}' filename",
          a: "`awk '{print $NF}' file.txt` - NF = Number of Fields, $NF = last field",
        },
        {
          id: "t7",
          q: "How to reverse a string?",
          command: "echo 'hello' | rev",
          a: "`echo 'hello' | rev` outputs 'olleh'\n`rev` command reverses characters in each line",
        },
      ],
    },
    {
      id: "processes",
      title: "⚙️ Process Management",
      level: "Intermediate",
      questions: [
        {
          id: "pr1",
          q: "How to check running processes?",
          command: "ps aux",
          a: "`ps aux` - Show all processes\n`ps -ef` - Full format listing\n`top` or `htop` - Interactive process viewer",
        },
        {
          id: "pr2",
          q: "How to kill a process?",
          command: "kill PID",
          a: "`kill 1234` - Graceful termination (SIGTERM)\n`kill -9 1234` - Force kill (SIGKILL)\n`pkill process_name` - Kill by name",
        },
        {
          id: "pr3",
          q: "How to run process in background?",
          command: "command &",
          a: "`./script.sh &` - Run in background\n`jobs` - List background jobs\n`fg %1` - Bring job 1 to foreground\n`bg %1` - Send to background",
        },
        {
          id: "pr4",
          q: "How to check which process is using a port?",
          command: "lsof -i :8080",
          a: "`lsof -i :8080` - List process on port 8080\n`netstat -tulpn | grep :8080` - Alternative",
        },
      ],
    },
    {
      id: "system",
      title: "🖥️ System Information & Monitoring",
      level: "Intermediate",
      questions: [
        {
          id: "s1",
          q: "How to check disk space?",
          command: "df -h",
          a: "`df -h` - Human readable disk usage\n`du -sh /folder` - Size of specific directory",
        },
        {
          id: "s2",
          q: "How to check memory usage?",
          command: "free -h",
          a: "`free -h` - Show memory in human format\n`top` - Real-time memory monitoring",
        },
        {
          id: "s3",
          q: "What's the difference between iostat, vmstat, and netstat?",
          a: "• `iostat` - CPU & disk I/O statistics\n• `vmstat` - Virtual memory statistics\n• `netstat` - Network connections and stats",
        },
        {
          id: "s4",
          q: "How to check system uptime?",
          command: "uptime",
          a: "`uptime` shows: current time, uptime, users, load average",
        },
      ],
    },
    {
      id: "advanced",
      title: "🚀 Advanced Unix/Linux",
      level: "Advanced",
      questions: [
        {
          id: "a1",
          q: "How to find all files modified in last 7 days?",
          command: "find . -type f -mtime -7",
          a: "`find . -type f -mtime -7` - Files modified within 7 days\n`find . -name '*.log' -mtime +30` - Log files older than 30 days",
        },
        {
          id: "a2",
          q: "How to compare two files?",
          command: "diff file1 file2",
          a: "`diff file1 file2` - Show differences\n`cmp file1 file2` - Compare byte by byte\n`comm file1 file2` - Compare sorted files",
        },
        {
          id: "a3",
          q: "How to schedule tasks?",
          command: "crontab -e",
          a: "Edit crontab: `crontab -e`\nExample: `0 2 * * * /backup.sh` - Run at 2 AM daily",
        },
        {
          id: "a4",
          q: "How to create a symbolic link?",
          command: "ln -s source linkname",
          a: "`ln -s /original/file.txt link.txt` - Creates soft link\n`ln /original/file.txt hardlink.txt` - Creates hard link",
        },
        {
          id: "a5",
          q: "How to compress and extract files?",
          command: "tar -czf archive.tar.gz folder",
          a: "Compress: `tar -czf archive.tar.gz folder/`\nExtract: `tar -xzf archive.tar.gz`\nZip: `zip -r archive.zip folder/`\nUnzip: `unzip archive.zip`",
        },
        {
          id: "a6",
          q: "How to monitor log files in real-time?",
          command: "tail -f /var/log/syslog",
          a: "`tail -f logfile.log` - Follow (continuously display) new entries\n`tail -f logfile.log | grep 'ERROR'` - Filter while following",
        },
        {
          id: "a7",
          q: "What is command substitution?",
          command: "$(command)",
          a: "`echo 'Today is $(date)'` - Output: Today is Fri Dec 13 10:30:00\n`files=$(ls)` - Store command output in variable",
        },
      ],
    },
    {
      id: "scenarios",
      title: "🎯 Real-World Scenarios",
      level: "Practical",
      questions: [
        {
          id: "sc1",
          q: "How to find all files containing a specific word?",
          command: "grep -r 'word' /path/",
          a: "`grep -r 'error' /var/log/` - Recursive search\n`grep -l 'pattern' *.txt` - List filenames only",
        },
        {
          id: "sc2",
          q: "How to remove empty lines from a file?",
          command: "grep -v '^$' file.txt",
          a: "`grep -v '^$' file.txt > newfile.txt`\n`sed '/^$/d' file.txt` - Using sed",
        },
        {
          id: "sc3",
          q: "How to count occurrences of a word?",
          command: "grep -o 'word' file.txt | wc -l",
          a: "`grep -o 'error' log.txt | wc -l` - Count 'error' occurrences",
        },
        {
          id: "sc4",
          q: "How to find large files (>100MB)?",
          command: "find . -type f -size +100M",
          a: "`find / -type f -size +100M 2>/dev/null` - Search entire system",
        },
        {
          id: "sc5",
          q: "How to check if last command succeeded?",
          command: "echo $?",
          a: "`echo $?` returns 0 for success, non-zero for failure\nUse in scripts: `if [ $? -eq 0 ]; then echo 'Success'; fi`",
        },
      ],
    },
  ];

  // Filter questions based on search
  const filteredSections = sections
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.command &&
            item.command.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((section) => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Unix/Linux Commands Interview Q&A
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Master Unix/Linux commands from basic to advanced with practical
            examples. Perfect for interview preparation and daily reference.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search commands or questions..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-gray-500">
                Found{" "}
                {filteredSections.reduce(
                  (sum, sec) => sum + sec.questions.length,
                  0
                )}{" "}
                results
              </p>
            )}
          </div>
        </div>

        {/* Progress/Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Total Questions",
              value: sections.reduce(
                (sum, sec) => sum + sec.questions.length,
                0
              ),
            },
            { label: "Beginner Level", value: "25+" },
            { label: "Intermediate", value: "20+" },
            { label: "Advanced", value: "15+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm border text-center"
            >
              <div className="text-2xl font-bold text-blue-600">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Q&A Sections */}
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      section.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : section.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {section.level}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                {openSections.includes(section.id) ? (
                  <ChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </button>

              {/* Section Content */}
              {openSections.includes(section.id) && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    {section.questions.map((item, idx) => (
                      <div
                        key={item.id}
                        className="pt-6 border-t border-gray-100 first:border-t-0 first:pt-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {item.q}
                              </h3>
                            </div>

                            {/* Command Box */}
                            {item.command && (
                              <div className="mt-4 mb-4 relative group">
                                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                  <span className="text-green-400">$ </span>
                                  {item.command}
                                </div>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      item.command!,
                                      `${section.id}-${item.id}`
                                    )
                                  }
                                  className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                                >
                                  {copiedIndex === `${section.id}-${item.id}` ? (
                                    <span className="text-green-400 text-sm">
                                      Copied!
                                    </span>
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-300" />
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Answer */}
                            <div className="bg-blue-50 rounded-xl p-5 mt-4">
                              <div className="text-gray-800 whitespace-pre-line font-medium">
                                {item.a.split("\n").map((line, i) => (
                                  <span key={i}>
                                    {line}
                                    <br />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            💡 Interview Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <span className="text-gray-700">
                  Practice commands in a terminal, not just memorization
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <span className="text-gray-700">
                  Understand common flags (like -r for recursive, -f for force)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <span className="text-gray-700">
                  Know file permission numbers (777, 644, 755)
                </span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <span className="text-gray-700">
                  Learn redirection ({" "}
                  <code className="text-sm bg-gray-100 px-1 rounded">
                    {">"}
                  </code>
                  ,{" "}
                  <code className="text-sm bg-gray-100 px-1 rounded">
                    {">>"}
                  </code>
                  ,{" "}
                  <code className="text-sm bg-gray-100 px-1 rounded">
                    2{">"}&1
                  </code>
                  ,{" "}
                  <code className="text-sm bg-gray-100 px-1 rounded">|</code> )
                  thoroughly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  5
                </div>
                <span className="text-gray-700">
                  Be ready for scenario-based questions ("How would you...")
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  6
                </div>
                <span className="text-gray-700">
                  Know basic shell scripting (variables, loops, conditions)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { cmd: "ls -l", desc: "List detailed" },
            { cmd: "grep -r", desc: "Recursive search" },
            { cmd: "find . -name", desc: "Find files" },
            { cmd: "chmod 755", desc: "Make executable" },
            { cmd: "ps aux", desc: "All processes" },
            { cmd: "tar -xzf", desc: "Extract tar.gz" },
            { cmd: "ssh user@host", desc: "Remote login" },
            { cmd: "crontab -e", desc: "Edit schedule" },
          ].map((ref, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition"
            >
              <code className="font-mono text-blue-600 font-bold">
                {ref.cmd}
              </code>
              <div className="text-sm text-gray-600 mt-1">{ref.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Master these commands and you'll be ready for most Unix/Linux
            interview questions! 🎯
          </p>
          <p className="mt-2">
            Total coverage:{" "}
            {sections.reduce((sum, sec) => sum + sec.questions.length, 0)}{" "}
            questions across 8 categories
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnixCommandsPage;