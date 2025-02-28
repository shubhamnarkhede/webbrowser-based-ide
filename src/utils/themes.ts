
// Default code templates for different languages
export const getDefaultCode = (language: string): string => {
  switch (language.toLowerCase()) {
    case 'javascript':
      return `// JavaScript Code Example
console.log("Hello, World!");

// Example function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Print first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}): \${fibonacci(i)}\`);
}`;

    case 'typescript':
      return `// TypeScript Code Example
console.log("Hello, TypeScript!");

// Example function with types
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Print first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}): \${fibonacci(i)}\`);
}`;

    case 'python':
      return `# Python Code Example
print("Hello, Python!")

# Example function
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Print first 10 fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}): {fibonacci(i)}")`;

    case 'java':
      return `// Java Code Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        
        // Print first 10 fibonacci numbers
        for (int i = 0; i < 10; i++) {
            System.out.println("Fibonacci(" + i + "): " + fibonacci(i));
        }
    }
    
    // Example function
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`;

    case 'c++':
    case 'cpp':
      return `// C++ Code Example
#include <iostream>

// Example function
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "Hello, C++!" << std::endl;
    
    // Print first 10 fibonacci numbers
    for (int i = 0; i < 10; i++) {
        std::cout << "Fibonacci(" << i << "): " << fibonacci(i) << std::endl;
    }
    
    return 0;
}`;

    case 'c#':
    case 'csharp':
      return `// C# Code Example
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
        
        // Print first 10 fibonacci numbers
        for (int i = 0; i < 10; i++) {
            Console.WriteLine($"Fibonacci({i}): {Fibonacci(i)}");
        }
    }
    
    // Example function
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}`;

    case 'ruby':
      return `# Ruby Code Example
puts "Hello, Ruby!"

# Example function
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

# Print first 10 fibonacci numbers
10.times do |i|
  puts "Fibonacci(#{i}): #{fibonacci(i)}"
end`;

    case 'go':
      return `// Go Code Example
package main

import "fmt"

// Example function
func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println("Hello, Go!")
    
    // Print first 10 fibonacci numbers
    for i := 0; i < 10; i++ {
        fmt.Printf("Fibonacci(%d): %d\\n", i, fibonacci(i))
    }
}`;

    case 'php':
      return `<?php
// PHP Code Example
echo "Hello, PHP!\\n";

// Example function
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

// Print first 10 fibonacci numbers
for ($i = 0; $i < 10; $i++) {
    echo "Fibonacci($i): " . fibonacci($i) . "\\n";
}
?>`;

    case 'rust':
      return `// Rust Code Example
fn main() {
    println!("Hello, Rust!");
    
    // Print first 10 fibonacci numbers
    for i in 0..10 {
        println!("Fibonacci({}): {}", i, fibonacci(i));
    }
}

// Example function
fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}`;

    case 'swift':
      return `// Swift Code Example
print("Hello, Swift!")

// Example function
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Print first 10 fibonacci numbers
for i in 0..<10 {
    print("Fibonacci(\\(i)): \\(fibonacci(i))")
}`;

    case 'kotlin':
      return `// Kotlin Code Example
fun main() {
    println("Hello, Kotlin!")
    
    // Print first 10 fibonacci numbers
    for (i in 0 until 10) {
        println("Fibonacci($i): ${fibonacci(i)}")
    }
}

// Example function
fun fibonacci(n: Int): Int {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}`;

    default:
      return `// Code Example
console.log("Hello, World!");

// Select a language from the dropdown to see language-specific examples.`;
  }
};

// Get available language options
export const getLanguageOptions = () => [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' }
];
