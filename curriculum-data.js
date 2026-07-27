window.LEARNING_TRACKS = [
  {
    id: "dsa",
    short: "01",
    name: "Algorithms",
    label: "Data structures & algorithms",
    summary: "Learn the patterns behind coding interviews, from visible loops to graphs and dynamic programming.",
    accent: "violet",
  },
  {
    id: "lld",
    short: "02",
    name: "Code design",
    label: "Python & low-level design",
    summary: "Turn working code into clear objects, relationships, patterns, and maintainable Python systems.",
    accent: "coral",
  },
  {
    id: "system",
    short: "03",
    name: "System design",
    label: "Scalable architecture",
    summary: "Follow a request through networks, services, data stores, caches, queues, and reliability decisions.",
    accent: "mint",
  },
];

window.CURRICULUM = [
  {
    id: "visible-loops",
    track: "dsa",
    level: "Basic",
    order: 1,
    title: "Visible loops",
    eyebrow: "Start here",
    summary: "Use star and number patterns to see exactly how rows, columns, and conditions become output.",
    intuition: "A pattern is a tiny two-dimensional problem. The outer loop chooses a row; the inner loop decides what belongs in each column.",
    points: [
      "Name the row and column before writing code.",
      "Separate spacing logic from value logic.",
      "Trace one row by hand before generalizing to n rows.",
    ],
    complexity: "Usually O(n²) time for an n × n pattern and O(1) extra space.",
    pseudocode: `FOR each row
    FOR each column
        decide whether to print a value or a space
    move to the next line`,
    python: `def triangle(rows):
    for row in range(1, rows + 1):
        print("* " * row)

triangle(5)`,
    related: ["complexity", "arrays-strings"],
  },
  {
    id: "complexity",
    track: "dsa",
    level: "Basic",
    order: 2,
    title: "Time & space complexity",
    eyebrow: "Measure the work",
    summary: "Describe how runtime and memory grow as the input gets larger instead of timing one computer.",
    intuition: "Keep the fastest-growing part. One pass is O(n), nested full passes are O(n²), and repeatedly halving a search space is O(log n).",
    points: [
      "Count work in terms of input size n.",
      "Drop constants and smaller terms.",
      "Measure extra working memory separately from the input.",
    ],
    complexity: "A language for comparing solutions: O(1), O(log n), O(n), O(n log n), O(n²), and beyond.",
    pseudocode: `count the operations that depend on n
keep the dominant term
report time and extra space separately`,
    python: `def contains(items, target):
    # One pass: O(n) time
    for item in items:
        if item == target:
            return True
    return False  # O(1) extra space`,
    related: ["sorting", "binary-search"],
  },
  {
    id: "arrays-strings",
    track: "dsa",
    level: "Basic",
    order: 3,
    title: "Arrays & strings",
    eyebrow: "Contiguous thinking",
    summary: "Master indexing, traversal, in-place updates, and the boundary decisions used by many interview patterns.",
    intuition: "An array gives fast indexed access. Most problems become easier after defining what a position, prefix, suffix, or range means.",
    points: [
      "Write down the valid index range.",
      "Decide whether order must be preserved.",
      "Use enumerate, slicing, and joins intentionally in Python.",
    ],
    complexity: "Index access is O(1); searching is O(n); inserting in the middle is usually O(n).",
    pseudocode: `best = first value
FOR each remaining value
    update best when the value is better
RETURN best`,
    python: `def max_value(numbers):
    best = numbers[0]
    for value in numbers[1:]:
        if value > best:
            best = value
    return best`,
    related: ["hashing", "two-pointers"],
  },
  {
    id: "hashing",
    track: "dsa",
    level: "Basic",
    order: 4,
    title: "Hash maps & sets",
    eyebrow: "Remember what you saw",
    summary: "Trade extra memory for fast membership checks, counting, grouping, and lookup by key.",
    intuition: "When a nested loop asks “have I seen the matching value?”, a set or dictionary often removes the second loop.",
    points: [
      "Use a set for membership and a dictionary for key → value.",
      "Store only the information the future needs.",
      "Know that average O(1) lookup uses extra space.",
    ],
    complexity: "Average O(1) insert and lookup; O(n) space when storing information about n items.",
    pseudocode: `seen = empty set
FOR value in values
    IF complement is in seen
        RETURN the pair
    add value to seen`,
    python: `def has_pair_with_sum(values, target):
    seen = set()
    for value in values:
        if target - value in seen:
            return True
        seen.add(value)
    return False`,
    related: ["arrays-strings", "sliding-window"],
  },
  {
    id: "sorting",
    track: "dsa",
    level: "Basic",
    order: 5,
    title: "Sorting",
    eyebrow: "Create useful order",
    summary: "Understand comparison, swapping, stability, and why ordered data unlocks faster strategies.",
    intuition: "Sorting spends work up front to make later decisions easier. Learn bubble sort visually, then use Python’s efficient built-in sort in real code.",
    points: [
      "Bubble sort is for learning swaps, not production.",
      "Merge sort explains divide-and-conquer and O(n log n).",
      "Python’s sorted returns a copy; list.sort changes the list.",
    ],
    complexity: "Bubble sort O(n²); efficient comparison sorts O(n log n); Python sorting is stable.",
    pseudocode: `REPEAT over the unsorted range
    compare each neighboring pair
    swap when the left value is larger
    stop early if no swap happened`,
    python: `def bubble_sort(values):
    values = values[:]
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for i in range(end):
            if values[i] > values[i + 1]:
                values[i], values[i + 1] = values[i + 1], values[i]
                swapped = True
        if not swapped:
            break
    return values`,
    related: ["binary-search", "two-pointers"],
    lab: "sort",
  },
  {
    id: "binary-search",
    track: "dsa",
    level: "Basic",
    order: 6,
    title: "Binary search",
    eyebrow: "Discard half",
    summary: "Find a target—or the first valid answer—by repeatedly removing half of an ordered search space.",
    intuition: "Binary search is not only “find in sorted array.” It works whenever answers change monotonically from impossible to possible.",
    points: [
      "State what low and high mean.",
      "Choose whether the interval is closed or half-open.",
      "Update a boundary so the search always shrinks.",
    ],
    complexity: "O(log n) time and O(1) extra space for the iterative version.",
    pseudocode: `low = 0, high = last index
WHILE low <= high
    mid = middle index
    IF value at mid is target: RETURN mid
    IF value is too small: move low right
    ELSE: move high left`,
    python: `def binary_search(values, target):
    low, high = 0, len(values) - 1
    while low <= high:
        mid = (low + high) // 2
        if values[mid] == target:
            return mid
        if values[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    related: ["sorting", "complexity"],
    lab: "search",
  },
  {
    id: "two-pointers",
    track: "dsa",
    level: "Intermediate",
    order: 7,
    title: "Two pointers",
    eyebrow: "Coordinate positions",
    summary: "Move two indexes through ordered data to replace nested comparisons with one purposeful scan.",
    intuition: "Each comparison tells you which pointer can no longer be part of a valid answer.",
    points: [
      "Common shapes: opposite ends, same direction, fast and slow.",
      "Define what lets each pointer move.",
      "Usually requires ordering or a clear invariant.",
    ],
    complexity: "Often O(n) time and O(1) space.",
    pseudocode: `left = start, right = end
WHILE left < right
    inspect the pair
    move left or right using what the comparison proves`,
    python: `def pair_sum_sorted(values, target):
    left, right = 0, len(values) - 1
    while left < right:
        total = values[left] + values[right]
        if total == target:
            return (left, right)
        if total < target:
            left += 1
        else:
            right -= 1
    return None`,
    related: ["sliding-window", "arrays-strings"],
  },
  {
    id: "sliding-window",
    track: "dsa",
    level: "Intermediate",
    order: 8,
    title: "Sliding window",
    eyebrow: "Reuse a range",
    summary: "Maintain a moving contiguous range so each item enters and leaves at most once.",
    intuition: "Instead of recomputing every substring or subarray, update the answer when the right side grows and the left side shrinks.",
    points: [
      "Use fixed windows for exact lengths.",
      "Use variable windows when a condition decides when to shrink.",
      "Track only the state needed to add and remove values.",
    ],
    complexity: "Commonly O(n) time because each boundary moves forward at most n times.",
    pseudocode: `left = 0
FOR right in the data
    add right value to window state
    WHILE window is invalid
        remove left value
        move left
    update the best valid answer`,
    python: `def longest_unique(text):
    last_seen = {}
    left = best = 0
    for right, char in enumerate(text):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        best = max(best, right - left + 1)
    return best`,
    related: ["two-pointers", "hashing"],
  },
  {
    id: "linked-lists",
    track: "dsa",
    level: "Intermediate",
    order: 9,
    title: "Linked lists",
    eyebrow: "Rewire references",
    summary: "Reason about nodes through references rather than indexes, especially reversal and cycle patterns.",
    intuition: "Draw arrows. Save the next node before changing a link, or the rest of the list becomes unreachable.",
    points: [
      "Track previous, current, and next during reversal.",
      "A dummy node removes many head edge cases.",
      "Fast and slow pointers can detect a cycle.",
    ],
    complexity: "Traversal is O(n); changing a known link is O(1); indexed access is O(n).",
    pseudocode: `previous = null
current = head
WHILE current exists
    save current.next
    point current.next backward
    advance previous and current
RETURN previous`,
    python: `def reverse(head):
    previous = None
    current = head
    while current:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous`,
    related: ["two-pointers", "stacks-queues"],
  },
  {
    id: "stacks-queues",
    track: "dsa",
    level: "Intermediate",
    order: 10,
    title: "Stacks & queues",
    eyebrow: "Control processing order",
    summary: "Use last-in-first-out for unfinished work and first-in-first-out for fair, level-by-level work.",
    intuition: "A stack returns the most recent item; a queue returns the oldest. The order is the algorithm.",
    points: [
      "Python list append/pop makes a stack.",
      "Use collections.deque for an efficient queue.",
      "Monotonic stacks keep only candidates that can still matter.",
    ],
    complexity: "Push and pop are typically O(1); processing n items is usually O(n).",
    pseudocode: `stack = empty
FOR token in input
    IF token opens something: push it
    ELSE compare it with the most recent opener`,
    python: `def balanced(text):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for char in text:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack`,
    related: ["linked-lists", "trees-heaps"],
  },
  {
    id: "recursion-backtracking",
    track: "dsa",
    level: "Intermediate",
    order: 11,
    title: "Recursion & backtracking",
    eyebrow: "Choose, explore, undo",
    summary: "Define a smaller version of the problem, then explore decision paths while restoring state.",
    intuition: "Every recursive call needs a stopping rule and progress toward it. Backtracking adds an explicit undo step.",
    points: [
      "Write the base case first.",
      "Know what one call promises to return.",
      "Choose → explore → unchoose.",
    ],
    complexity: "Often proportional to the number of states; subset generation is O(2ⁿ).",
    pseudocode: `search(partial choice)
    IF complete: record answer
    FOR each available option
        choose option
        search(updated choice)
        undo option`,
    python: `def subsets(values):
    result, path = [], []

    def search(index):
        if index == len(values):
            result.append(path[:])
            return
        search(index + 1)
        path.append(values[index])
        search(index + 1)
        path.pop()

    search(0)
    return result`,
    related: ["trees-heaps", "dynamic-programming"],
  },
  {
    id: "trees-heaps",
    track: "dsa",
    level: "Intermediate",
    order: 12,
    title: "Trees, BSTs & heaps",
    eyebrow: "Use hierarchy",
    summary: "Traverse parent-child structures and use ordering rules to search or retrieve priorities efficiently.",
    intuition: "Tree problems are usually traversal problems. Decide whether depth-first or level-by-level order matches the question.",
    points: [
      "DFS uses recursion or a stack; BFS uses a queue.",
      "A BST orders left < node < right.",
      "A heap gives fast access to the smallest or largest priority.",
    ],
    complexity: "Traversal O(n); balanced BST operations O(log n); heap push/pop O(log n).",
    pseudocode: `IF node is empty: RETURN
visit node
traverse left subtree
traverse right subtree`,
    python: `def tree_sum(node):
    if node is None:
        return 0
    return (
        node.value
        + tree_sum(node.left)
        + tree_sum(node.right)
    )`,
    related: ["graphs", "recursion-backtracking"],
  },
  {
    id: "graphs",
    track: "dsa",
    level: "Advanced",
    order: 13,
    title: "Graphs",
    eyebrow: "Model connections",
    summary: "Represent relationships as nodes and edges, then explore reachability, shortest paths, and dependencies.",
    intuition: "Use BFS for unweighted shortest paths and layer-by-layer exploration; use DFS for deep exploration and structural questions.",
    points: [
      "Choose an adjacency list for sparse graphs.",
      "Mark nodes visited before scheduling them again.",
      "Weighted shortest paths need algorithms such as Dijkstra.",
    ],
    complexity: "BFS and DFS are O(V + E) time with O(V) working space.",
    pseudocode: `queue = [start]
mark start visited
WHILE queue is not empty
    node = remove front
    FOR neighbor of node
        IF unseen: mark and add to queue`,
    python: `from collections import deque

def bfs(graph, start):
    order = []
    queue = deque([start])
    seen = {start}
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return order`,
    related: ["trees-heaps", "dynamic-programming"],
    lab: "graph",
  },
  {
    id: "greedy",
    track: "dsa",
    level: "Advanced",
    order: 14,
    title: "Greedy algorithms",
    eyebrow: "Commit to a local choice",
    summary: "Build an answer one locally optimal choice at a time—only when that choice can be proven safe.",
    intuition: "Greedy is not “pick what looks best.” The key is proving that a best solution can include your choice.",
    points: [
      "Look for exchange arguments or a stays-ahead proof.",
      "Sorting often reveals the safe choice.",
      "If choices affect future possibilities unpredictably, consider DP.",
    ],
    complexity: "Often O(n log n) because sorting dominates, followed by an O(n) scan.",
    pseudocode: `sort candidates by the safe-choice rule
FOR candidate in order
    IF compatible with current answer
        accept candidate`,
    python: `def max_non_overlapping(intervals):
    intervals.sort(key=lambda item: item[1])
    chosen, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            chosen += 1
            last_end = end
    return chosen`,
    related: ["sorting", "dynamic-programming"],
  },
  {
    id: "dynamic-programming",
    track: "dsa",
    level: "Advanced",
    order: 15,
    title: "Dynamic programming",
    eyebrow: "Reuse solved states",
    summary: "Define a state, a recurrence, and base cases so overlapping work is solved once.",
    intuition: "DP is organized brute force. First describe the choices recursively; then cache states or build them bottom-up.",
    points: [
      "State: the smallest information that defines a subproblem.",
      "Transition: how smaller answers create the current answer.",
      "Base case and evaluation order complete the solution.",
    ],
    complexity: "Usually number of states × work per state; memory can often be compressed.",
    pseudocode: `dp[base cases] = known answers
FOR each later state in dependency order
    dp[state] = combine earlier states
RETURN the requested state`,
    python: `def climb_stairs(steps):
    if steps <= 1:
        return 1
    previous, current = 1, 1
    for _ in range(2, steps + 1):
        previous, current = current, previous + current
    return current`,
    related: ["recursion-backtracking", "graphs"],
    lab: "dp",
  },
  {
    id: "advanced-structures",
    track: "dsa",
    level: "Advanced",
    order: 16,
    title: "Advanced structures",
    eyebrow: "Specialized tools",
    summary: "Recognize when tries, union-find, Fenwick trees, or segment trees match a specialized query pattern.",
    intuition: "Do not begin here. Each structure is valuable because it makes one repeated operation dramatically cheaper.",
    points: [
      "Trie: prefix lookup.",
      "Union-find: dynamic connectivity.",
      "Fenwick/segment tree: repeated range queries and updates.",
    ],
    complexity: "Varies: near O(1) amortized union-find; O(log n) Fenwick and segment tree operations.",
    pseudocode: `identify repeated query and update operations
choose the structure optimized for both
hide its mechanics behind a small interface`,
    python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))

    def find(self, node):
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]

    def union(self, a, b):
        self.parent[self.find(a)] = self.find(b)`,
    related: ["graphs", "complexity"],
  },
  {
    id: "classes-objects",
    track: "lld",
    level: "Basic",
    order: 1,
    title: "Classes & objects",
    eyebrow: "Bundle state and behavior",
    summary: "Use a class when data and the rules that protect or change it belong together.",
    intuition: "A class is a blueprint; an object is one concrete instance. Give each class one clear responsibility.",
    points: [
      "Initialize valid state in __init__.",
      "Prefer meaningful behavior over get/set methods everywhere.",
      "Keep the public interface smaller than the implementation.",
    ],
    complexity: "Design quality is measured by clarity, cohesion, and ease of change—not Big O alone.",
    pseudocode: `CLASS BankAccount
    state: owner, balance
    behavior: deposit, withdraw
    protect the rule that balance cannot go below zero`,
    python: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self._balance = 0

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount`,
    related: ["encapsulation-abstraction", "composition"],
  },
  {
    id: "encapsulation-abstraction",
    track: "lld",
    level: "Basic",
    order: 2,
    title: "Encapsulation & abstraction",
    eyebrow: "Protect the contract",
    summary: "Hide changeable details and expose a small interface that tells callers what they can rely on.",
    intuition: "Encapsulation protects state. Abstraction lets a caller use a capability without knowing every implementation detail.",
    points: [
      "Make invalid states difficult to create.",
      "Expose intent, not storage details.",
      "Python uses conventions and properties rather than strict private fields.",
    ],
    complexity: "The payoff is lower coupling: internal changes affect fewer callers.",
    pseudocode: `expose a small operation
validate inputs at the boundary
keep representation and helper steps internal`,
    python: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32`,
    related: ["classes-objects", "inheritance-polymorphism"],
  },
  {
    id: "inheritance-polymorphism",
    track: "lld",
    level: "Basic",
    order: 3,
    title: "Inheritance & polymorphism",
    eyebrow: "One interface, many behaviors",
    summary: "Let different objects respond to the same operation while keeping callers independent of concrete types.",
    intuition: "Inheritance represents a genuine “is-a” relationship. Polymorphism is the more valuable idea: code talks to a capability, not a specific class.",
    points: [
      "Subtypes must honor the parent contract.",
      "Prefer shallow inheritance hierarchies.",
      "Python often uses duck typing or Protocol.",
    ],
    complexity: "Good polymorphism removes conditional branches and makes new variants easier to add.",
    pseudocode: `define a shared operation
implement it differently in each compatible type
let the caller use only the shared operation`,
    python: `from typing import Protocol

class Notifier(Protocol):
    def send(self, message: str) -> None: ...

def welcome(notifier: Notifier):
    notifier.send("Welcome!")`,
    related: ["composition", "strategy-pattern"],
  },
  {
    id: "composition",
    track: "lld",
    level: "Basic",
    order: 4,
    title: "Composition & relationships",
    eyebrow: "Build from collaborators",
    summary: "Model has-a relationships by giving an object focused collaborators rather than inheriting everything.",
    intuition: "Composition lets behavior change by replacing one part. It is often safer and more flexible than inheritance.",
    points: [
      "Association: objects know each other.",
      "Aggregation: a part can live independently.",
      "Composition: the owner controls the part’s lifetime.",
    ],
    complexity: "Composition reduces inheritance coupling at the cost of wiring more objects together.",
    pseudocode: `CLASS OrderService
    receives payment service as a collaborator
    delegates payment work through its public interface`,
    python: `class Checkout:
    def __init__(self, payment_gateway):
        self.payment_gateway = payment_gateway

    def place_order(self, order):
        self.payment_gateway.charge(order.total)
        order.mark_paid()`,
    related: ["inheritance-polymorphism", "solid"],
  },
  {
    id: "solid",
    track: "lld",
    level: "Intermediate",
    order: 5,
    title: "SOLID design principles",
    eyebrow: "Design for change",
    summary: "Use five practical lenses to keep responsibilities focused and dependencies replaceable.",
    intuition: "SOLID is not a checklist for adding interfaces. It helps identify why a change would ripple through unrelated code.",
    points: [
      "S: one reason to change. O: extend without rewriting stable code.",
      "L: subtypes preserve expectations. I: small focused interfaces.",
      "D: high-level policy depends on abstractions.",
    ],
    complexity: "Apply only where change is likely; over-abstraction can make a small system harder to read.",
    pseudocode: `separate policy from changing details
define the smallest interface policy needs
inject a concrete implementation at the edge`,
    python: `class ReportService:
    def __init__(self, exporter):
        self.exporter = exporter

    def create(self, data):
        report = self._summarize(data)
        return self.exporter.export(report)`,
    related: ["composition", "uml-modeling"],
  },
  {
    id: "uml-modeling",
    track: "lld",
    level: "Intermediate",
    order: 6,
    title: "UML & object modeling",
    eyebrow: "Draw before details",
    summary: "Turn requirements into responsibilities, relationships, and interactions before writing every method.",
    intuition: "A useful model answers who owns state, who performs each behavior, and how objects collaborate on one scenario.",
    points: [
      "Use nouns as candidate entities, not automatic classes.",
      "Use verbs to discover responsibilities.",
      "Class diagrams show structure; sequence diagrams show one flow over time.",
    ],
    complexity: "A small diagram is a communication tool, not a promise to model every field.",
    pseudocode: `list core use cases
identify objects involved in each
assign every behavior to one owner
draw relationships and one key sequence`,
    python: `from dataclasses import dataclass

@dataclass
class LineItem:
    name: str
    price: float

@dataclass
class Order:
    items: list[LineItem]`,
    related: ["solid", "lld-interview"],
  },
  {
    id: "factory-pattern",
    track: "lld",
    level: "Intermediate",
    order: 7,
    title: "Factory pattern",
    eyebrow: "Centralize creation",
    summary: "Move object-selection and construction rules away from the code that uses the object.",
    intuition: "Use a factory when the caller knows the capability it needs but should not know which concrete class to build.",
    points: [
      "Useful when construction has branching or setup.",
      "Returns a shared interface.",
      "Avoid factories that only hide one obvious constructor.",
    ],
    complexity: "Adds one indirection while keeping creation rules in one place.",
    pseudocode: `receive a type or configuration
choose a compatible implementation
construct it
return it through the shared interface`,
    python: `def make_parser(file_name):
    if file_name.endswith(".json"):
        return JsonParser()
    if file_name.endswith(".csv"):
        return CsvParser()
    raise ValueError("Unsupported file")`,
    related: ["strategy-pattern", "solid"],
  },
  {
    id: "strategy-pattern",
    track: "lld",
    level: "Intermediate",
    order: 8,
    title: "Strategy pattern",
    eyebrow: "Swap an algorithm",
    summary: "Put interchangeable policies behind one interface so behavior can change without changing the client.",
    intuition: "If a growing conditional chooses how work is performed, each branch may be a strategy.",
    points: [
      "The context owns the workflow.",
      "The strategy owns one replaceable algorithm.",
      "Pass strategies through the constructor for easy testing.",
    ],
    complexity: "Replaces conditionals with small collaborating objects or functions.",
    pseudocode: `context receives a strategy
context gathers required inputs
strategy calculates the variable part
context completes the workflow`,
    python: `def checkout(cart, discount):
    subtotal = sum(item.price for item in cart)
    return discount(subtotal)

def no_discount(total):
    return total

def ten_percent(total):
    return total * 0.90`,
    related: ["factory-pattern", "observer-pattern"],
  },
  {
    id: "observer-pattern",
    track: "lld",
    level: "Intermediate",
    order: 9,
    title: "Observer pattern",
    eyebrow: "Broadcast a change",
    summary: "Let interested listeners subscribe to events without making the publisher depend on their concrete behavior.",
    intuition: "One action can trigger email, analytics, and inventory updates without placing all three inside the order class.",
    points: [
      "Publish an event with the facts listeners need.",
      "Subscribers remain independent.",
      "Decide how failures and ordering are handled.",
    ],
    complexity: "Reduces direct coupling but makes the full flow less visible.",
    pseudocode: `publisher stores listeners
when an event happens
    notify each listener with event data`,
    python: `class Event:
    def __init__(self):
        self.listeners = []

    def subscribe(self, listener):
        self.listeners.append(listener)

    def emit(self, data):
        for listener in self.listeners:
            listener(data)`,
    related: ["strategy-pattern", "state-decorator"],
  },
  {
    id: "state-decorator",
    track: "lld",
    level: "Advanced",
    order: 10,
    title: "State, decorator & command",
    eyebrow: "Behavioral building blocks",
    summary: "Model behavior that changes by state, wrap features in layers, or represent a request as an object.",
    intuition: "State replaces status conditionals; decorator adds behavior around a component; command makes an action storable and undoable.",
    points: [
      "State: transitions control allowed behavior.",
      "Decorator: same interface, wrapped behavior.",
      "Command: execute, queue, log, or undo an action.",
    ],
    complexity: "More objects, but each changing behavior gets a focused home.",
    pseudocode: `identify the changing dimension
give each variant the same small interface
delegate instead of branching throughout the client`,
    python: `class LoggingWriter:
    def __init__(self, writer, log):
        self.writer = writer
        self.log = log

    def write(self, text):
        self.log.info("writing %s characters", len(text))
        return self.writer.write(text)`,
    related: ["observer-pattern", "concurrency"],
  },
  {
    id: "concurrency",
    track: "lld",
    level: "Advanced",
    order: 11,
    title: "Concurrency essentials",
    eyebrow: "Coordinate shared work",
    summary: "Protect shared state, avoid unsafe interleavings, and understand locks, queues, deadlocks, and worker pools.",
    intuition: "A race occurs when correctness depends on timing. Reduce shared mutable state before adding locks.",
    points: [
      "Make critical sections small.",
      "Acquire multiple locks in a consistent order.",
      "Queues are often safer boundaries between producers and consumers.",
    ],
    complexity: "Synchronization adds waiting and reasoning cost; correctness comes before parallel speed.",
    pseudocode: `acquire protection for shared state
read and update the state as one atomic action
release protection even when an error occurs`,
    python: `from threading import Lock

class Counter:
    def __init__(self):
        self.value = 0
        self._lock = Lock()

    def increment(self):
        with self._lock:
            self.value += 1`,
    related: ["state-decorator", "lld-interview"],
  },
  {
    id: "lld-interview",
    track: "lld",
    level: "Advanced",
    order: 12,
    title: "LLD interview workflow",
    eyebrow: "From prompt to design",
    summary: "Clarify one small system, model its responsibilities, walk a key flow, and then discuss extension points.",
    intuition: "Interviewers want your decisions and tradeoffs, not a giant class diagram. Build the smallest coherent model first.",
    points: [
      "Clarify scope and primary use cases.",
      "Name entities, behaviors, and invariants.",
      "Walk one sequence and then test the design against a change.",
    ],
    complexity: "A good 45-minute design favors a clear core over exhaustive implementation.",
    pseudocode: `clarify → identify use cases → model objects
define interfaces → walk one sequence
check edge cases → explain extensions and tradeoffs`,
    python: `class ParkingLot:
    def __init__(self, spot_finder, pricing):
        self.spot_finder = spot_finder
        self.pricing = pricing

    def enter(self, vehicle):
        spot = self.spot_finder.find(vehicle)
        return Ticket(vehicle, spot)`,
    related: ["uml-modeling", "solid"],
  },
  {
    id: "requirements-estimation",
    track: "system",
    level: "Basic",
    order: 1,
    title: "Requirements & estimation",
    eyebrow: "Define the problem",
    summary: "Separate essential user behavior from scale, latency, availability, durability, and security expectations.",
    intuition: "Architecture follows constraints. Ten requests per day and ten million per second should not produce the same design.",
    points: [
      "Clarify core reads, writes, and users.",
      "Estimate traffic, storage, and bandwidth with round numbers.",
      "Name the most important quality attribute.",
    ],
    complexity: "Back-of-the-envelope estimates need the right order of magnitude, not false precision.",
    pseudocode: `list core use cases
estimate users × actions per user
convert to requests per second
estimate record size × records retained`,
    python: `daily_users = 1_000_000
actions_per_user = 20
average_rps = daily_users * actions_per_user / 86_400
peak_rps = average_rps * 5

print(round(peak_rps), "peak requests/second")`,
    related: ["scalability", "design-framework"],
  },
  {
    id: "scalability",
    track: "system",
    level: "Basic",
    order: 2,
    title: "Scalability & performance",
    eyebrow: "Grow without collapse",
    summary: "Distinguish latency, throughput, bandwidth, vertical scaling, and horizontal scaling.",
    intuition: "Latency is time per request; throughput is completed work per unit time. Improving one does not automatically improve the other.",
    points: [
      "Scale up: a stronger machine. Scale out: more machines.",
      "Stateless services are easier to scale horizontally.",
      "Measure percentiles, not only averages.",
    ],
    complexity: "Scaling adds coordination, failure modes, and operational cost.",
    pseudocode: `measure the bottleneck
remove unnecessary work
cache or batch when valid
partition work across replicas when one machine is not enough`,
    python: `def percentile(values, p):
    ordered = sorted(values)
    index = int((len(ordered) - 1) * p)
    return ordered[index]

p95 = percentile(latencies_ms, 0.95)`,
    related: ["load-balancing", "requirements-estimation"],
  },
  {
    id: "request-journey",
    track: "system",
    level: "Basic",
    order: 3,
    title: "Network request journey",
    eyebrow: "Follow the packet",
    summary: "See how DNS, TCP/TLS, HTTP, proxies, and application servers cooperate to answer one request.",
    intuition: "A URL becomes an IP address, a secure connection, an HTTP request, application work, and a response.",
    points: [
      "DNS resolves names to network addresses.",
      "TLS protects data in transit.",
      "A reverse proxy stands in front of application servers.",
    ],
    complexity: "Every network hop adds latency and another place to observe or fail.",
    pseudocode: `resolve domain with DNS
open a transport connection
negotiate encryption
send HTTP request
route request to application
return HTTP response`,
    python: `from urllib.request import urlopen

with urlopen("https://example.com") as response:
    print(response.status)
    print(response.headers["content-type"])`,
    related: ["load-balancing", "api-design"],
  },
  {
    id: "load-balancing",
    track: "system",
    level: "Basic",
    order: 4,
    title: "Load balancing",
    eyebrow: "Distribute traffic",
    summary: "Place a traffic director in front of service replicas to spread work and route around unhealthy instances.",
    intuition: "The load balancer gives clients one address while the service can grow, shrink, and replace machines behind it.",
    points: [
      "Round robin is simple; least-connections reacts to uneven work.",
      "Health checks stop routing to failed instances.",
      "Sticky sessions trade flexibility for local session affinity.",
    ],
    complexity: "A load balancer improves availability but must itself be redundant.",
    pseudocode: `keep a list of healthy servers
choose the next server using a routing policy
forward the request
retry only when it is safe`,
    python: `from itertools import cycle

class RoundRobin:
    def __init__(self, servers):
        self._servers = cycle(servers)

    def choose(self):
        return next(self._servers)`,
    related: ["scalability", "api-design"],
  },
  {
    id: "api-design",
    track: "system",
    level: "Intermediate",
    order: 5,
    title: "APIs, gateways & rate limits",
    eyebrow: "Design the boundary",
    summary: "Create predictable contracts, authenticate requests, limit abuse, and route clients through a stable entry point.",
    intuition: "An API is a promise between systems. Consistent resources, errors, pagination, and retry behavior matter more than clever URLs.",
    points: [
      "Use idempotency for safely retried writes.",
      "Paginate unbounded collections.",
      "Rate limits protect capacity and fairness.",
    ],
    complexity: "Gateways centralize cross-cutting policy but can become a bottleneck or overly coupled layer.",
    pseudocode: `authenticate request
check rate limit
validate input
route to service
return stable status and error shape`,
    python: `import time

class TokenBucket:
    def __init__(self, capacity):
        self.capacity = capacity
        self.tokens = capacity

    def allow(self):
        if self.tokens == 0:
            return False
        self.tokens -= 1
        return True`,
    related: ["request-journey", "security-idempotency"],
  },
  {
    id: "data-modeling",
    track: "system",
    level: "Intermediate",
    order: 6,
    title: "Data modeling: SQL & NoSQL",
    eyebrow: "Shape durable state",
    summary: "Choose a store from access patterns, relationships, consistency needs, and operational constraints.",
    intuition: "Start with what the product reads and writes. SQL favors rich relationships and transactions; NoSQL families favor particular scale and access shapes.",
    points: [
      "Model important invariants close to the data.",
      "Normalize for consistency; denormalize for specific read paths.",
      "No database category is automatically “more scalable.”",
    ],
    complexity: "Data model changes are expensive; optimize for correctness and known access patterns first.",
    pseudocode: `list entities and invariants
list common reads and writes
choose keys and relationships
test the model against the highest-volume queries`,
    python: `# Domain shape before database syntax
order = {
    "id": "ord_123",
    "customer_id": "cus_9",
    "status": "pending",
    "items": [{"sku": "A1", "quantity": 2}],
}`,
    related: ["indexes", "replication-sharding"],
  },
  {
    id: "indexes",
    track: "system",
    level: "Intermediate",
    order: 7,
    title: "Database indexes",
    eyebrow: "Pay to find faster",
    summary: "Maintain an ordered lookup structure so important queries avoid scanning every record.",
    intuition: "An index is like a book index: extra space and update work buy faster reads for selected fields.",
    points: [
      "Index fields used by frequent filters, joins, and ordering.",
      "Composite index order matters.",
      "Too many indexes slow writes and consume storage.",
    ],
    complexity: "Typical tree index lookup O(log n), plus the cost of matching rows.",
    pseudocode: `observe a slow frequent query
inspect its filter and order fields
add the smallest useful index
measure reads and write impact`,
    python: `# Conceptual query shape
def recent_orders(store, customer_id):
    return store.find(
        customer_id=customer_id,
        order_by="created_at DESC",
        limit=20,
    )`,
    related: ["data-modeling", "caching"],
  },
  {
    id: "caching",
    track: "system",
    level: "Intermediate",
    order: 8,
    title: "Caching & CDNs",
    eyebrow: "Reuse expensive answers",
    summary: "Keep frequently used data closer to the caller while making freshness and invalidation explicit.",
    intuition: "A cache is a faster copy. Every cache design must answer what is stored, how long it is valid, and what happens on a miss.",
    points: [
      "Cache-aside: app checks cache, then source, then fills cache.",
      "TTL limits staleness but does not guarantee freshness.",
      "A CDN is a geographically distributed cache for content.",
    ],
    complexity: "Faster reads and lower origin load in exchange for stale data and invalidation complexity.",
    pseudocode: `value = cache.get(key)
IF value is missing
    value = source.read(key)
    cache.set(key, value, ttl)
RETURN value`,
    python: `def get_profile(user_id, cache, database):
    key = f"profile:{user_id}"
    profile = cache.get(key)
    if profile is None:
        profile = database.get_profile(user_id)
        cache.set(key, profile, ttl=300)
    return profile`,
    related: ["indexes", "queues-events"],
  },
  {
    id: "queues-events",
    track: "system",
    level: "Intermediate",
    order: 9,
    title: "Queues, pub/sub & events",
    eyebrow: "Decouple time",
    summary: "Buffer work and notify independent consumers without forcing every service to finish in one request.",
    intuition: "A queue usually delivers work to one consumer group; pub/sub broadcasts an event to multiple interested groups.",
    points: [
      "Consumers must tolerate duplicate delivery.",
      "Dead-letter queues isolate repeatedly failing messages.",
      "Async work improves resilience but adds eventual consistency.",
    ],
    complexity: "Reduces peak coupling while adding delivery, ordering, and observability concerns.",
    pseudocode: `producer writes a durable message
broker stores and delivers it
consumer processes it
consumer acknowledges success
failed messages retry with limits`,
    python: `def handle_order_created(event):
    if processed_events.contains(event.id):
        return
    send_receipt(event.customer_id)
    processed_events.add(event.id)`,
    related: ["caching", "resilience"],
  },
  {
    id: "replication-sharding",
    track: "system",
    level: "Advanced",
    order: 10,
    title: "Replication & sharding",
    eyebrow: "Copy or divide data",
    summary: "Replicate data for availability and read capacity; shard it when one machine cannot own the full workload.",
    intuition: "Replication makes copies of the same data. Sharding gives different data to different partitions.",
    points: [
      "Replication lag can produce stale reads.",
      "Choose shard keys that spread load and support queries.",
      "Rebalancing and cross-shard operations are major costs.",
    ],
    complexity: "More capacity and fault tolerance in exchange for coordination and operational complexity.",
    pseudocode: `route each key through a partition function
store replicas of each partition
detect failed replicas
promote or reroute while preserving correctness`,
    python: `def shard_for(user_id, shard_count):
    return hash(user_id) % shard_count

shard = databases[shard_for(user_id, len(databases))]
profile = shard.get(user_id)`,
    related: ["consistency", "data-modeling"],
  },
  {
    id: "consistency",
    track: "system",
    level: "Advanced",
    order: 11,
    title: "Consistency & CAP",
    eyebrow: "Choose guarantees",
    summary: "Decide what clients may observe when data is copied and the network delays or partitions communication.",
    intuition: "During a network partition, a distributed system cannot guarantee both every request succeeds and every read sees the latest write.",
    points: [
      "Strong consistency simplifies client reasoning.",
      "Eventual consistency improves availability for tolerant use cases.",
      "State the guarantee per operation, not for the whole company.",
    ],
    complexity: "Stronger coordination usually costs latency or availability during failures.",
    pseudocode: `identify the invariant
decide whether stale reads are acceptable
choose read/write coordination
define conflict and retry behavior`,
    python: `def reserve(stock, quantity):
    # The storage transaction must make this atomic.
    if stock.available < quantity:
        raise OutOfStock()
    stock.available -= quantity
    stock.save()`,
    related: ["replication-sharding", "resilience"],
  },
  {
    id: "resilience",
    track: "system",
    level: "Advanced",
    order: 12,
    title: "Resilience & fault tolerance",
    eyebrow: "Design for failure",
    summary: "Use timeouts, bounded retries, circuit breakers, redundancy, and graceful degradation.",
    intuition: "Distributed calls will fail. The goal is to contain failures instead of allowing one slow dependency to consume the whole system.",
    points: [
      "Every remote call needs a timeout.",
      "Retry with backoff and jitter only when safe.",
      "Circuit breakers stop repeated calls to an unhealthy dependency.",
    ],
    complexity: "Redundancy costs money; retries can multiply load during an outage.",
    pseudocode: `call dependency with timeout
IF transient failure and retry is safe
    wait with backoff and jitter
    retry within a fixed budget
otherwise degrade or fail clearly`,
    python: `def fetch_with_fallback(client, key, cache):
    try:
        return client.fetch(key, timeout=0.2)
    except TimeoutError:
        cached = cache.get(key)
        if cached is not None:
            return cached
        raise`,
    related: ["queues-events", "observability"],
  },
  {
    id: "observability",
    track: "system",
    level: "Advanced",
    order: 13,
    title: "Observability & reliability",
    eyebrow: "Know what the system is doing",
    summary: "Combine metrics, logs, traces, health signals, SLOs, and alerts to understand behavior in production.",
    intuition: "Metrics show that something is wrong, traces show where time went, and logs explain specific events.",
    points: [
      "Measure latency, traffic, errors, and saturation.",
      "Use correlation IDs across service boundaries.",
      "Alert on user impact and error budgets, not every unusual number.",
    ],
    complexity: "Telemetry has storage and performance cost; sample deliberately and never leak sensitive data.",
    pseudocode: `assign request ID
measure start time
record outcome and duration
propagate trace context
alert when service objectives are at risk`,
    python: `import time

def timed(operation, metrics):
    started = time.perf_counter()
    try:
        return operation()
    finally:
        duration = time.perf_counter() - started
        metrics.observe("operation_seconds", duration)`,
    related: ["resilience", "security-idempotency"],
  },
  {
    id: "security-idempotency",
    track: "system",
    level: "Advanced",
    order: 14,
    title: "Security & idempotency",
    eyebrow: "Make safe behavior repeatable",
    summary: "Authenticate identity, authorize actions, protect data, validate input, and make retries safe.",
    intuition: "Authentication asks who; authorization asks whether they may do this. Idempotency ensures repeating the same request does not repeat the effect.",
    points: [
      "Use least privilege and short-lived credentials.",
      "Encrypt in transit and at rest.",
      "Store the result for each idempotency key on critical writes.",
    ],
    complexity: "Security belongs in every layer; centralized controls need service-level enforcement too.",
    pseudocode: `authenticate caller
authorize requested action
validate and normalize input
check idempotency key
perform write and remember result atomically`,
    python: `def create_payment(request, store):
    key = request.idempotency_key
    previous = store.result_for(key)
    if previous:
        return previous
    result = charge(request.amount)
    store.save_result(key, result)
    return result`,
    related: ["api-design", "design-framework"],
  },
  {
    id: "design-framework",
    track: "system",
    level: "Advanced",
    order: 15,
    title: "System design interview flow",
    eyebrow: "Tell a coherent story",
    summary: "Move from scope and estimates to APIs, data, architecture, bottlenecks, and explicit tradeoffs.",
    intuition: "A system design answer is a sequence of justified decisions. Start simple, find the pressure point, then evolve the design.",
    points: [
      "Clarify requirements and scale before drawing.",
      "Define core API and data model.",
      "Draw the read/write path, then address the likely bottleneck.",
    ],
    complexity: "Depth on the important tradeoff is more valuable than naming every technology.",
    pseudocode: `requirements → estimates → API → data model
high-level flow → bottleneck → scale and reliability
security → observability → recap tradeoffs`,
    python: `design = [
    "requirements and scale",
    "API and data model",
    "request flow",
    "bottleneck and failure modes",
    "tradeoffs and next step",
]

for step in design:
    explain(step)`,
    related: ["requirements-estimation", "security-idempotency"],
  },
];
