// app/notes/unix/page.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Terminal,
  Folder,
  File,
  Server,
  Database,
  Network,
  Shield,
  Cpu,
  MemoryStick,
  HardDrive,
  Users,
  Key,
  GitBranch,
  Docker,
  Cloud,
  TerminalSquare,
  Copy,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code,
  Zap,
  AlertCircle,
  Package as PackageIcon,
} from "lucide-react";

interface UnixNote {
  id: string;
  title: string;
  content: string;
  category: string;
  examples: string[];
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: any;
}

const UnixNotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedNotes, setExpandedNotes] = useState<string[]>(["basics"]);

  const toggleNote = (id: string) => {
    setExpandedNotes((prev) =>
      prev.includes(id)
        ? prev.filter((noteId) => noteId !== id)
        : [...prev, id]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add toast notification here
  };

  // Unix/Linux Notes Data - FIXED: Using PackageIcon instead of Package
  const unixNotes: UnixNote[] = [
    {
      id: "basics",
      title: "Basic Unix Commands",
      category: "Basics",
      difficulty: "Beginner",
      icon: Terminal,
      tags: ["navigation", "files", "directories"],
      content: `
Essential commands every Unix/Linux user should know. These are the foundation of working in terminal.

**Key Concepts:**
- Everything is a file (including directories and devices)
- Case-sensitive file system
- Hidden files start with .
- Paths: absolute (/) vs relative (.)
      `,
      examples: [
        "pwd - Print working directory",
        "ls - List files",
        "cd - Change directory",
        "mkdir - Create directory",
        "rmdir - Remove directory",
        "touch - Create empty file",
        "cp - Copy files/directories",
        "mv - Move/rename files",
        "rm - Remove files",
        "cat - Concatenate and display files",
      ],
    },
    {
      id: "file-permissions",
      title: "File Permissions & Ownership",
      category: "Security",
      difficulty: "Beginner",
      icon: Shield,
      tags: ["permissions", "chmod", "chown", "security"],
      content: `
Understanding Unix file permissions is crucial for security and proper system administration.

**Permission Types:**
- r (read) = 4
- w (write) = 2
- x (execute) = 1

**User Groups:**
- u = user/owner
- g = group
- o = others
- a = all users
      `,
      examples: [
        "chmod 755 script.sh - rwxr-xr-x",
        "chmod +x file - Add execute permission",
        "chmod go-w file - Remove write from group & others",
        "chown user:group file - Change owner and group",
        "chgrp developers file - Change group only",
        "ls -l - View permissions",
        "umask 022 - Set default permissions",
      ],
    },
    {
      id: "text-processing",
      title: "Text Processing Commands",
      category: "Text Processing",
      difficulty: "Intermediate",
      icon: File,
      tags: ["grep", "sed", "awk", "cut", "sort"],
      content: `
Powerful commands for manipulating and analyzing text files. Essential for log analysis, data processing, and automation.

**Common Use Cases:**
- Search and filter logs
- Extract specific columns from CSV/TSV
- Transform text formats
- Find and replace patterns
- Sort and deduplicate data
      `,
      examples: [
        "grep 'error' log.txt - Find lines containing 'error'",
        "sed 's/old/new/g' file - Replace all occurrences",
        "awk '{print $1}' file - Print first column",
        "cut -d',' -f1,3 file.csv - Extract columns 1 and 3",
        "sort file.txt | uniq - Sort and remove duplicates",
        "wc -l file.txt - Count lines",
        "head -20 file.txt - First 20 lines",
        "tail -f log.txt - Follow log file in real-time",
      ],
    },
    {
      id: "process-management",
      title: "Process Management",
      category: "System",
      difficulty: "Intermediate",
      icon: Cpu,
      tags: ["ps", "kill", "jobs", "bg", "fg", "nohup"],
      content: `
Managing processes is essential for system administration and development. Learn how to control what's running on your system.

**Key Concepts:**
- PID (Process ID) - Unique identifier for each process
- Signals - Ways to communicate with processes
- Foreground vs Background jobs
- Parent/Child process relationships
      `,
      examples: [
        "ps aux - View all processes",
        "top - Interactive process viewer",
        "htop - Enhanced process viewer",
        "kill -9 PID - Force kill process",
        "pkill process_name - Kill by name",
        "jobs - List background jobs",
        "fg %1 - Bring job 1 to foreground",
        "bg %1 - Send job 1 to background",
        "nohup command & - Run command immune to hangups",
      ],
    },
    {
      id: "networking",
      title: "Networking Commands",
      category: "Networking",
      difficulty: "Intermediate",
      icon: Network,
      tags: ["ssh", "scp", "curl", "wget", "netstat", "ping"],
      content: `
Essential commands for network troubleshooting, file transfer, and remote system management.

**Common Scenarios:**
- Test network connectivity
- Transfer files between systems
- Check open ports and connections
- Download files from the internet
- Connect to remote servers
      `,
      examples: [
        "ping google.com - Test connectivity",
        "ssh user@host - Secure shell connection",
        "scp file.txt user@host:/path - Secure copy",
        "curl -O http://example.com/file - Download file",
        "wget http://example.com/file - Download file",
        "netstat -tulpn - List listening ports",
        "ifconfig / ip addr - Network interface info",
        "traceroute google.com - Trace network path",
        "dig google.com - DNS lookup",
      ],
    },
    {
      id: "disk-usage",
      title: "Disk & Storage Management",
      category: "System",
      difficulty: "Intermediate",
      icon: HardDrive,
      tags: ["df", "du", "mount", "fdisk", "lsblk"],
      content: `
Monitor and manage disk space, partitions, and storage devices. Critical for system maintenance and troubleshooting.

**Important Concepts:**
- Filesystems (ext4, xfs, btrfs, etc.)
- Mount points
- Inodes
- Disk partitions
- RAID configurations
      `,
      examples: [
        "df -h - Human readable disk usage",
        "du -sh /path - Size of directory",
        "lsblk - List block devices",
        "fdisk -l - List partitions",
        "mount - Show mounted filesystems",
        "umount /dev/sda1 - Unmount filesystem",
        "fsck /dev/sda1 - Check and repair filesystem",
        "dd if=/dev/zero of=file bs=1M count=100 - Create test file",
      ],
    },
    {
      id: "shell-scripting",
      title: "Shell Scripting Basics",
      category: "Scripting",
      difficulty: "Intermediate",
      icon: TerminalSquare,
      tags: ["bash", "shell", "scripting", "variables", "loops"],
      content: `
Learn to automate tasks with shell scripts. Shell scripting is powerful for system administration and task automation.

**Script Essentials:**
- Shebang line (#!)
- Variables and environment
- Control structures (if, for, while)
- Functions
- Exit codes
- Command substitution
      `,
      examples: [
        "#!/bin/bash - Shebang for bash",
        'echo "Hello $USER" - Variables',
        'if [ $? -eq 0 ]; then echo "Success"; fi - Conditionals',
        'for i in {1..10}; do echo $i; done - For loop',
        'while true; do echo "Running"; sleep 1; done - While loop',
        'function greet() { echo "Hello $1"; } - Functions',
        '$(date) or \`date\` - Command substitution',
      ],
    },
    {
      id: "user-management",
      title: "User & Group Management",
      category: "Administration",
      difficulty: "Intermediate",
      icon: Users,
      tags: ["useradd", "usermod", "groupadd", "passwd", "sudo"],
      content: `
Manage users, groups, and permissions in multi-user systems. Essential for system administrators.

**Key Files:**
- /etc/passwd - User information
- /etc/shadow - Encrypted passwords
- /etc/group - Group information
- /etc/sudoers - Sudo permissions
      `,
      examples: [
        "useradd username - Create new user",
        "usermod -aG group username - Add user to group",
        "passwd username - Change password",
        "groupadd groupname - Create new group",
        "id username - Show user ID and groups",
        "whoami - Show current user",
        "sudo command - Run as superuser",
        "visudo - Edit sudoers file safely",
      ],
    },
    {
      id: "system-monitoring",
      title: "System Monitoring & Performance",
      category: "Monitoring",
      difficulty: "Advanced",
      icon: MemoryStick,
      tags: ["top", "vmstat", "iostat", "sar", "dstat"],
      content: `
Monitor system resources and performance. Identify bottlenecks and troubleshoot issues.

**Key Metrics:**
- CPU usage and load average
- Memory usage (RAM and swap)
- Disk I/O statistics
- Network traffic
- Process resource consumption
      `,
      examples: [
        "top - Real-time system monitoring",
        "htop - Enhanced system monitor",
        "vmstat 1 - Virtual memory statistics",
        "iostat -x 1 - Disk I/O statistics",
        "free -h - Memory usage",
        "uptime - System uptime and load",
        "sar - System Activity Reporter",
        "dstat - Versatile resource statistics",
      ],
    },
    {
      id: "package-management",
      title: "Package Management",
      category: "Administration",
      difficulty: "Intermediate",
      icon: PackageIcon, // FIXED: Using imported PackageIcon
      tags: ["apt", "yum", "dnf", "pacman", "rpm", "dpkg"],
      content: `
Install, update, and manage software packages. Different distributions use different package managers.

**Common Package Managers:**
- Debian/Ubuntu: apt, dpkg
- RHEL/CentOS: yum, dnf, rpm
- Arch: pacman
- OpenSUSE: zypper
      `,
      examples: [
        "apt update && apt upgrade - Update packages (Debian)",
        "yum install package - Install package (RHEL)",
        "dnf install package - Install package (Fedora)",
        "pacman -S package - Install package (Arch)",
        "dpkg -i package.deb - Install .deb file",
        "rpm -i package.rpm - Install .rpm file",
        "apt search keyword - Search for packages",
        "apt remove package - Remove package",
      ],
    },
    {
      id: "log-files",
      title: "Log Files & Monitoring",
      category: "Monitoring",
      difficulty: "Intermediate",
      icon: AlertCircle,
      tags: ["journalctl", "logs", "debugging", "troubleshooting"],
      content: `
System and application logs are crucial for debugging and monitoring. Know where to look and how to analyze them.

**Important Log Files:**
- /var/log/syslog - System logs
- /var/log/auth.log - Authentication logs
- /var/log/kern.log - Kernel logs
- /var/log/apache2/ - Web server logs
- /var/log/mysql/ - Database logs
      `,
      examples: [
        "tail -f /var/log/syslog - Follow system log",
        "journalctl -u service - View service logs",
        "grep 'error' /var/log/syslog - Find errors",
        "dmesg - View kernel ring buffer",
        "last - Show recent logins",
        "who / w - Show logged in users",
        "find /var/log -name '*.log' - Find all log files",
      ],
    },
    {
      id: "advanced-tools",
      title: "Advanced Tools & Utilities",
      category: "Advanced",
      difficulty: "Advanced",
      icon: Zap,
      tags: ["tmux", "screen", "cron", "systemd", "find", "xargs"],
      content: `
Powerful utilities for advanced users and system administrators. These tools can significantly boost productivity.

**Productivity Boosters:**
- Terminal multiplexers (tmux/screen)
- Scheduled tasks (cron)
- Process supervision (systemd)
- File searching (find with xargs)
- Stream editing (sed advanced patterns)
      `,
      examples: [
        "tmux new -s session - Start tmux session",
        "crontab -e - Edit cron jobs",
        "systemctl status service - Check service status",
        "find . -type f -name '*.log' -exec rm {} \\; - Find and delete",
        "xargs - Parallel command execution",
        "awk 'BEGIN {FS=\":\"} {print $1}' - Advanced text processing",
        "sed -n '/pattern/,/pattern/p' file - Range operations",
        "tar -czf archive.tar.gz --exclude='*.tmp' * - Archive with exclude",
      ],
    },
  ];

  // Categories for filtering
  const categories = [
    "All",
    "Basics",
    "Security",
    "Text Processing",
    "System",
    "Networking",
    "Scripting",
    "Administration",
    "Monitoring",
    "Advanced",
  ];

  // Filter notes based on search and category
  const filteredNotes = unixNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      note.examples.some((ex) => ex.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group by difficulty
  const beginnerNotes = filteredNotes.filter(n => n.difficulty === "Beginner");
  const intermediateNotes = filteredNotes.filter(n => n.difficulty === "Intermediate");
  const advancedNotes = filteredNotes.filter(n => n.difficulty === "Advanced");

  // Stats
  const stats = {
    total: unixNotes.length,
    beginner: unixNotes.filter(n => n.difficulty === "Beginner").length,
    intermediate: unixNotes.filter(n => n.difficulty === "Intermediate").length,
    advanced: unixNotes.filter(n => n.difficulty === "Advanced").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Terminal className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Unix/Linux Notes</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive reference for Unix/Linux commands and concepts
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-gray-600 text-sm mt-1">Total Topics</div>
                </div>
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.beginner}</div>
                  <div className="text-gray-600 text-sm mt-1">Beginner</div>
                </div>
                <Terminal className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-amber-600">{stats.intermediate}</div>
                  <div className="text-gray-600 text-sm mt-1">Intermediate</div>
                </div>
                <Code className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{stats.advanced}</div>
                  <div className="text-gray-600 text-sm mt-1">Advanced</div>
                </div>
                <Zap className="w-8 h-8 text-red-400" />
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
                  placeholder="Search Unix commands, concepts, or examples..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
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
              <span className="text-gray-600 text-sm">Quick search:</span>
              {["grep", "sed", "awk", "chmod", "ssh", "cron", "find", "tar"].map((tag) => (
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

        {/* Main Content */}
        <div className="space-y-10">
          {/* Beginner Section */}
          {beginnerNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Terminal className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Beginner Level</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {beginnerNotes.length} topics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beginnerNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <note.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {note.category}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {note.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedNotes.includes(note.id) ? (
                        <ChevronUp className="w-6 h-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>

                    {expandedNotes.includes(note.id) && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                          {note.content.split("\n").map((line, i) => (
                            <p key={i} className="mb-2">
                              {line.startsWith("**") ? (
                                <strong>{line.replace(/\*\*/g, "")}</strong>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Code className="w-5 h-5 text-gray-500" />
                            <h4 className="font-semibold text-gray-900">Examples:</h4>
                          </div>
                          <div className="space-y-2">
                            {note.examples.map((example, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative group"
                              >
                                <span className="text-green-400">$ </span>
                                {example}
                                <button
                                  onClick={() => copyToClipboard(example)}
                                  className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Intermediate Section */}
          {intermediateNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Code className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Intermediate Level</h2>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  {intermediateNotes.length} topics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {intermediateNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <note.icon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {note.category}
                            </span>
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                              {note.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedNotes.includes(note.id) ? (
                        <ChevronUp className="w-6 h-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>

                    {expandedNotes.includes(note.id) && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                          {note.content.split("\n").map((line, i) => (
                            <p key={i} className="mb-2">
                              {line.startsWith("**") ? (
                                <strong>{line.replace(/\*\*/g, "")}</strong>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Code className="w-5 h-5 text-gray-500" />
                            <h4 className="font-semibold text-gray-900">Examples:</h4>
                          </div>
                          <div className="space-y-2">
                            {note.examples.map((example, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative group"
                              >
                                <span className="text-green-400">$ </span>
                                {example}
                                <button
                                  onClick={() => copyToClipboard(example)}
                                  className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Section */}
          {advancedNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Advanced Level</h2>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {advancedNotes.length} topics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advancedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <note.icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{note.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {note.category}
                            </span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                              {note.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedNotes.includes(note.id) ? (
                        <ChevronUp className="w-6 h-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      )}
                    </button>

                    {expandedNotes.includes(note.id) && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                          {note.content.split("\n").map((line, i) => (
                            <p key={i} className="mb-2">
                              {line.startsWith("**") ? (
                                <strong>{line.replace(/\*\*/g, "")}</strong>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Code className="w-5 h-5 text-gray-500" />
                            <h4 className="font-semibold text-gray-900">Examples:</h4>
                          </div>
                          <div className="space-y-2">
                            {note.examples.map((example, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative group"
                              >
                                <span className="text-green-400">$ </span>
                                {example}
                                <button
                                  onClick={() => copyToClipboard(example)}
                                  className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredNotes.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <Terminal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Unix notes found
              </h3>
              <p className="text-gray-500">
                Try a different search term or category
              </p>
            </div>
          )}
        </div>

        {/* Quick Reference Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Unix Quick Reference</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { cmd: "Ctrl+C", desc: "Kill current process" },
              { cmd: "Ctrl+Z", desc: "Suspend process" },
              { cmd: "Ctrl+D", desc: "End of file/Exit" },
              { cmd: "Ctrl+R", desc: "Search command history" },
              { cmd: "!!", desc: "Repeat last command" },
              { cmd: "!$", desc: "Last argument of prev command" },
              { cmd: "man command", desc: "Show manual page" },
              { cmd: "command --help", desc: "Show help for command" },
            ].map((ref, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200">
                <code className="font-mono font-bold text-blue-600">{ref.cmd}</code>
                <div className="text-sm text-gray-600 mt-1">{ref.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4">Essential File Locations:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/etc/</code>
                <span className="text-gray-600">System config files</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/var/log/</code>
                <span className="text-gray-600">Log files</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/home/</code>
                <span className="text-gray-600">User directories</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/bin, /sbin</code>
                <span className="text-gray-600">Binary executables</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/tmp</code>
                <span className="text-gray-600">Temporary files</span>
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-500" />
                <code className="text-gray-700">/proc</code>
                <span className="text-gray-600">Process information</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Unix/Linux Notes • {stats.total} topics across 3 difficulty levels</p>
          <p className="mt-2">Click on any topic to expand and view detailed examples</p>
        </div>
      </div>
    </div>
  );
};

export default UnixNotesPage;