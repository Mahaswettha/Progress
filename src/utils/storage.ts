import { PersonalDataStore, PersonalProblemData, CodeLanguage } from '../types/tracker';

const STORAGE_KEY = 'striver_a2z_personal_tracker_v1';

export const STARTER_CODE: Record<CodeLanguage, string> = {
  java: `import java.util.*;

class Solution {
    public void solve() {
        // Write your solution here
        
    }
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void solve() {
        // Write your solution here
        
    }
};`,
  python: `class Solution:
    def solve(self):
        # Write your solution here
        pass
`
};

export const DEFAULT_INITIAL_DATA: PersonalDataStore = {
  "p-360": {
    "notes": "Snake and ladder\n________________________\nimport java.util.*;\n\npublic class Main {\n\n    public static int snakesAndLadders(int[][] board) {\n\n        int n = board.length;\n        int[] dist = new int[n * n + 1];\n        Arrays.fill(dist, -1);\n\n        Queue<Integer> q = new LinkedList<>();\n        q.offer(1);\n        dist[1] = 0;\n\n        while (!q.isEmpty()) {\n\n            int x = q.poll();\n\n            for (int i = 1; i <= 6 && x + i <= n * n; i++) {\n\n                int t = x + i;\n\n                int row = (t - 1) / n;\n                int col = (t - 1) % n;\n\n                int value = board[n - 1 - row][(row % 2 == 1) ? (n - 1 - col) : col];\n\n                int y = (value > 0) ? value : t;\n\n                if (y == n * n)\n                    return dist[x] + 1;\n\n                if (dist[y] == -1) {\n                    dist[y] = dist[x] + 1;\n                    q.offer(y);\n                }\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n\n        int N = 8;\n        int arr[] = {3,22,5,8,11,26,20,29,17,4,19,7,27,1,21,9};\n\n        int n = 6; \n        int[][] board = new int[n][n];\n\n        for (int[] row : board)\n            Arrays.fill(row, -1);\n\n        for (int i = 0; i < 2 * N; i += 2) {\n\n            int start = arr[i];\n            int end = arr[i + 1];\n\n            int r = (start - 1) / n;\n            int c = (start - 1) % n;\n\n            int row = n - 1 - r;\n            int col = (r % 2 == 1) ? (n - 1 - c) : c;\n\n            board[row][col] = end;\n        }\n\n        System.out.println(snakesAndLadders(board));\n    }\n}",
    "code": "Snake and ladder\n________________________\nimport java.util.*;\n\npublic class Main {\n\n    public static int snakesAndLadders(int[][] board) {\n\n        int n = board.length;\n        int[] dist = new int[n * n + 1];\n        Arrays.fill(dist, -1);\n\n        Queue<Integer> q = new LinkedList<>();\n        q.offer(1);\n        dist[1] = 0;\n\n        while (!q.isEmpty()) {\n\n            int x = q.poll();\n\n            for (int i = 1; i <= 6 && x + i <= n * n; i++) {\n\n                int t = x + i;\n\n                int row = (t - 1) / n;\n                int col = (t - 1) % n;\n\n                int value = board[n - 1 - row][(row % 2 == 1) ? (n - 1 - col) : col];\n\n                int y = (value > 0) ? value : t;\n\n                if (y == n * n)\n                    return dist[x] + 1;\n\n                if (dist[y] == -1) {\n                    dist[y] = dist[x] + 1;\n                    q.offer(y);\n                }\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n\n        int N = 8;\n        int arr[] = {3,22,5,8,11,26,20,29,17,4,19,7,27,1,21,9};\n\n        int n = 6; \n        int[][] board = new int[n][n];\n\n        for (int[] row : board)\n            Arrays.fill(row, -1);\n\n        for (int i = 0; i < 2 * N; i += 2) {\n\n            int start = arr[i];\n            int end = arr[i + 1];\n\n            int r = (start - 1) / n;\n            int c = (start - 1) % n;\n\n            int row = n - 1 - r;\n            int col = (r % 2 == 1) ? (n - 1 - c) : c;\n\n            board[row][col] = end;\n        }\n\n        System.out.println(snakesAndLadders(board));\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-435": {
    "notes": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        boolean dp[]=new boolean[s.length()+1];\n        dp[0]=true;\n        for(int i=1;i<=s.length();i++){\n            for(String ch:wordDict){\n                int st=i-ch.length();\n                if(st>=0&&dp[st]&&s.substring(st,i).equals(ch)){\n                    dp[i]=true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}",
    "code": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        boolean dp[]=new boolean[s.length()+1];\n        dp[0]=true;\n        for(int i=1;i<=s.length();i++){\n            for(String ch:wordDict){\n                int st=i-ch.length();\n                if(st>=0&&dp[st]&&s.substring(st,i).equals(ch)){\n                    dp[i]=true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-066": {
    "notes": "class Solution {\n\n    public int inversionCount(int[] nums) {\n        return mergeSort(nums, 0, nums.length - 1);\n    }\n\n    private int mergeSort(int[] nums, int left, int right) {\n\n        if (left >= right) {\n            return 0;\n        }\n\n        int mid = left + (right - left) / 2;\n\n        int count = 0;\n\n        count += mergeSort(nums, left, mid);\n        count += mergeSort(nums, mid + 1, right);\n\n        count += countInversions(nums, left, mid, right);\n\n        merge(nums, left, mid, right);\n\n        return count;\n    }\n\n    private int countInversions(int[] nums, int left, int mid, int right) {\n\n        int count = 0;\n\n        int j = mid + 1;\n\n        for (int i = left; i <= mid; i++) {\n\n            while (j <= right && nums[i] > nums[j]) {\n                j++;\n            }\n\n            count += j - (mid + 1);\n        }\n\n        return count;\n    }\n\n    private void merge(int[] nums, int left, int mid, int right) {\n\n        int[] temp = new int[right - left + 1];\n\n        int i = left;\n        int j = mid + 1;\n        int k = 0;\n\n        while (i <= mid && j <= right) {\n\n            if (nums[i] <= nums[j]) {\n                temp[k] = nums[i];\n                i++;\n            } else {\n                temp[k] = nums[j];\n                j++;\n            }\n\n            k++;\n        }\n\n        while (i <= mid) {\n            temp[k] = nums[i];\n            i++;\n            k++;\n        }\n\n        while (j <= right) {\n            temp[k] = nums[j];\n            j++;\n            k++;\n        }\n\n        for (int x = 0; x < temp.length; x++) {\n            nums[left + x] = temp[x];\n        }\n    }\n}",
    "code": "class Solution {\n\n    public int inversionCount(int[] nums) {\n        return mergeSort(nums, 0, nums.length - 1);\n    }\n\n    private int mergeSort(int[] nums, int left, int right) {\n\n        if (left >= right) {\n            return 0;\n        }\n\n        int mid = left + (right - left) / 2;\n\n        int count = 0;\n\n        count += mergeSort(nums, left, mid);\n        count += mergeSort(nums, mid + 1, right);\n\n        count += countInversions(nums, left, mid, right);\n\n        merge(nums, left, mid, right);\n\n        return count;\n    }\n\n    private int countInversions(int[] nums, int left, int mid, int right) {\n\n        int count = 0;\n\n        int j = mid + 1;\n\n        for (int i = left; i <= mid; i++) {\n\n            while (j <= right && nums[i] > nums[j]) {\n                j++;\n            }\n\n            count += j - (mid + 1);\n        }\n\n        return count;\n    }\n\n    private void merge(int[] nums, int left, int mid, int right) {\n\n        int[] temp = new int[right - left + 1];\n\n        int i = left;\n        int j = mid + 1;\n        int k = 0;\n\n        while (i <= mid && j <= right) {\n\n            if (nums[i] <= nums[j]) {\n                temp[k] = nums[i];\n                i++;\n            } else {\n                temp[k] = nums[j];\n                j++;\n            }\n\n            k++;\n        }\n\n        while (i <= mid) {\n            temp[k] = nums[i];\n            i++;\n            k++;\n        }\n\n        while (j <= right) {\n            temp[k] = nums[j];\n            j++;\n            k++;\n        }\n\n        for (int x = 0; x < temp.length; x++) {\n            nums[left + x] = temp[x];\n        }\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-052": {
    "notes": "public class tUf {\n    public static int majorityElement(int []v) {\n        //size of the given array:\n        int n = v.length;\n\n        //declaring a map:\n        HashMap<Integer, Integer> mpp = new HashMap<>();\n\n        //storing the elements with its occurnce:\n        for (int i = 0; i < n; i++) {\n            int value = mpp.getOrDefault(v[i], 0);\n            mpp.put(v[i], value + 1);\n        }\n\n        //searching for the majority element:\n        for (Map.Entry<Integer, Integer> it : mpp.entrySet()) {\n            if (it.getValue() > (n / 2)) {\n                return it.getKey();\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String args[]) {\n        int[] arr = {2, 2, 1, 1, 1, 2, 2};\n        int ans = majorityElement(arr);\n        System.out.println(\"The majority element is: \" + ans);\n\n    }\n\n}",
    "code": "public class tUf {\n    public static int majorityElement(int []v) {\n        //size of the given array:\n        int n = v.length;\n\n        //declaring a map:\n        HashMap<Integer, Integer> mpp = new HashMap<>();\n\n        //storing the elements with its occurnce:\n        for (int i = 0; i < n; i++) {\n            int value = mpp.getOrDefault(v[i], 0);\n            mpp.put(v[i], value + 1);\n        }\n\n        //searching for the majority element:\n        for (Map.Entry<Integer, Integer> it : mpp.entrySet()) {\n            if (it.getValue() > (n / 2)) {\n                return it.getKey();\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String args[]) {\n        int[] arr = {2, 2, 1, 1, 1, 2, 2};\n        int ans = majorityElement(arr);\n        System.out.println(\"The majority element is: \" + ans);\n\n    }\n\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-068": {
    "notes": "class Solution {\n    public int maxProduct(int[] nums) {\n        \n        int max = nums[0], min = nums[0], ans = nums[0];\n        int n = nums.length;\n        \n        for (int i = 1; i < n; i++) {\n        \n\t\t\t// Swapping min and max\n            if (nums[i] < 0){\n                int temp = max;\n                max = min;\n                min = temp;\n            }\n                \n\n\n            max = Math.max(nums[i], max * nums[i]);\n            min = Math.min(nums[i], min * nums[i]);\n\n\n            ans = Math.max(ans, max);\n        }\n        \n        return ans;\n\n    }\n}",
    "code": "class Solution {\n    public int maxProduct(int[] nums) {\n        \n        int max = nums[0], min = nums[0], ans = nums[0];\n        int n = nums.length;\n        \n        for (int i = 1; i < n; i++) {\n        \n\t\t\t// Swapping min and max\n            if (nums[i] < 0){\n                int temp = max;\n                max = min;\n                min = temp;\n            }\n                \n\n\n            max = Math.max(nums[i], max * nums[i]);\n            min = Math.min(nums[i], min * nums[i]);\n\n\n            ans = Math.max(ans, max);\n        }\n        \n        return ans;\n\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-067": {
    "notes": "class Solution {\n    public int reversePairs(int[] nums) {\n        return mergeSort(nums, 0, nums.length - 1);\n    }\n    private int countPairs(int[] nums, int left, int mid, int right){\n        int count = 0;\n        int temp = mid + 1;\n        for(int i = left; i <= mid; i++){\n            while(temp <= right && (long) nums[i] > (long) 2 * nums[temp]){\n                temp++;\n            }\n            count += (temp - (mid + 1));\n        }\n\n        return count;\n    }\n\n    private int mergeSort(int[] nums, int left, int right){\n        if(left >= right) {\n            return 0;\n        }\n        int mid = left + (right - left) / 2;\n        int count = 0;\n\n        count += mergeSort(nums, left, mid);\n        count += mergeSort(nums, mid + 1, right);\n        count += countPairs(nums, left, mid, right);\n        merge(nums, left, mid, right);\n\n        return count;\n    }\n\n    private void merge(int[] nums, int left, int mid, int right){\n        int[] temp = new int[right - left + 1];\n\n        int i = left;\n        int j = mid + 1;\n        int k = 0;\n\n        while(i <= mid && j <= right){\n            if(nums[i] <= nums[j]){\n                temp[k] = nums[i];\n                i++;\n            }\n            else {\n                temp[k] = nums[j];\n                j++;\n            }\n            k++;\n        }\n        while(i <= mid){\n            temp[k] = nums[i];\n            i++;\n            k++;\n        }\n        while(j <= right){\n            temp[k] = nums[j];\n            j++;\n            k++;\n        }\n\n        for(int x = 0; x < temp.length; x++){\n            nums[left + x] = temp[x];\n        }\n    }\n}",
    "code": "class Solution {\n    public int reversePairs(int[] nums) {\n        return mergeSort(nums, 0, nums.length - 1);\n    }\n    private int countPairs(int[] nums, int left, int mid, int right){\n        int count = 0;\n        int temp = mid + 1;\n        for(int i = left; i <= mid; i++){\n            while(temp <= right && (long) nums[i] > (long) 2 * nums[temp]){\n                temp++;\n            }\n            count += (temp - (mid + 1));\n        }\n\n        return count;\n    }\n\n    private int mergeSort(int[] nums, int left, int right){\n        if(left >= right) {\n            return 0;\n        }\n        int mid = left + (right - left) / 2;\n        int count = 0;\n\n        count += mergeSort(nums, left, mid);\n        count += mergeSort(nums, mid + 1, right);\n        count += countPairs(nums, left, mid, right);\n        merge(nums, left, mid, right);\n\n        return count;\n    }\n\n    private void merge(int[] nums, int left, int mid, int right){\n        int[] temp = new int[right - left + 1];\n\n        int i = left;\n        int j = mid + 1;\n        int k = 0;\n\n        while(i <= mid && j <= right){\n            if(nums[i] <= nums[j]){\n                temp[k] = nums[i];\n                i++;\n            }\n            else {\n                temp[k] = nums[j];\n                j++;\n            }\n            k++;\n        }\n        while(i <= mid){\n            temp[k] = nums[i];\n            i++;\n            k++;\n        }\n        while(j <= right){\n            temp[k] = nums[j];\n            j++;\n            k++;\n        }\n\n        for(int x = 0; x < temp.length; x++){\n            nums[left + x] = temp[x];\n        }\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-063": {
    "notes": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Set<List<Integer>> res = new HashSet<>();\n        Arrays.sort(nums);\n\n        for (int i = 0; i < nums.length; i++) {\n            int j = i + 1;\n            int k = nums.length - 1;\n\n            while (j < k) {\n                int total = nums[i] + nums[j] + nums[k];\n\n                if (total > 0) {\n                    k--;\n                }\n                else if (total < 0) {\n                    j++;\n                }\n                else {\n                    res.add(Arrays.asList(nums[i], nums[j], nums[k]));\n                    j++; \n                    k--;               \n                }\n            }\n        }\n        return new ArrayList<>(res);\n    }\n}",
    "code": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Set<List<Integer>> res = new HashSet<>();\n        Arrays.sort(nums);\n\n        for (int i = 0; i < nums.length; i++) {\n            int j = i + 1;\n            int k = nums.length - 1;\n\n            while (j < k) {\n                int total = nums[i] + nums[j] + nums[k];\n\n                if (total > 0) {\n                    k--;\n                }\n                else if (total < 0) {\n                    j++;\n                }\n                else {\n                    res.add(Arrays.asList(nums[i], nums[j], nums[k]));\n                    j++; \n                    k--;               \n                }\n            }\n        }\n        return new ArrayList<>(res);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-064": {
    "notes": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n\n        Set<List<Integer>> res = new HashSet<>();\n        int n = nums.length;\n        Arrays.sort(nums);\n\n        for (int i = 0; i < n; i++) {\n\n            for (int j = i + 1; j < n; j++) {\n\n                int l = j + 1;\n                int r = n - 1;\n\n                while (l < r) {\n                    long sum = (long) nums[i] + nums[j] + nums[l] + nums[r];\n\n                    if (sum > target) {\n                        r--;\n                    }\n                    else if (sum < target) {\n                        l++;\n                    }\n                    else {\n                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));\n                        l++;\n                        r--;\n                    }\n                }\n            }\n        }\n        return new ArrayList<>(res);\n    }\n}",
    "code": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n\n        Set<List<Integer>> res = new HashSet<>();\n        int n = nums.length;\n        Arrays.sort(nums);\n\n        for (int i = 0; i < n; i++) {\n\n            for (int j = i + 1; j < n; j++) {\n\n                int l = j + 1;\n                int r = n - 1;\n\n                while (l < r) {\n                    long sum = (long) nums[i] + nums[j] + nums[l] + nums[r];\n\n                    if (sum > target) {\n                        r--;\n                    }\n                    else if (sum < target) {\n                        l++;\n                    }\n                    else {\n                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));\n                        l++;\n                        r--;\n                    }\n                }\n            }\n        }\n        return new ArrayList<>(res);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-056": {
    "notes": "class Solution {\n    static ArrayList<Integer> leaders(int arr[]) {\n        // code here\n        ArrayList<Integer> li=new ArrayList<>();\n        int max=arr[arr.length-1];\n        li.add(arr[arr.length-1]);\n        for(int i=arr.length-2;i>=0;i--){\n            if(arr[i]>=max){\n                li.add(arr[i]);\n                max=arr[i];\n            }\n        }\n        Collections.reverse(li);\n        return li;\n    }\n}",
    "code": "class Solution {\n    static ArrayList<Integer> leaders(int arr[]) {\n        // code here\n        ArrayList<Integer> li=new ArrayList<>();\n        int max=arr[arr.length-1];\n        li.add(arr[arr.length-1]);\n        for(int i=arr.length-2;i>=0;i--){\n            if(arr[i]>=max){\n                li.add(arr[i]);\n                max=arr[i];\n            }\n        }\n        Collections.reverse(li);\n        return li;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-055": {
    "notes": "java code\n-----------------------------------------------------\n\nhttps://leetcode.com/problems/next-permutation/solutions/8518110/java-beats-100-next-permutation-easy-opt-b4i8  \n\n\nc++ code\n----------------------------------------------------\n\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n\n    next_permutation(arr.begin(), arr.end());\n\n    for (int num : arr) {\n        cout << num << \" \";\n    }\n\n    return 0;\n}",
    "code": "java code\n-----------------------------------------------------\n\nhttps://leetcode.com/problems/next-permutation/solutions/8518110/java-beats-100-next-permutation-easy-opt-b4i8  \n\n\nc++ code\n----------------------------------------------------\n\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    vector<int> arr(n);\n    for (int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n\n    next_permutation(arr.begin(), arr.end());\n\n    for (int num : arr) {\n        cout << num << \" \";\n    }\n\n    return 0;\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-060": {
    "notes": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    \n    public static List<Integer> printSpiral(int[][] mat) {\n        \n        // Define ans list to store the result.\n        List<Integer> ans = new ArrayList<>();\n        \n        int n = mat.length; // no. of rows\n        int m = mat[0].length; // no. of columns\n        \n        // Initialize the pointers required for traversal.\n        int top = 0, left = 0, bottom = n - 1, right = m - 1;\n\n        // Loop until all elements are not traversed.\n        while (top <= bottom && left <= right) {\n\n            // For moving left to right\n            for (int i = left; i <= right; i++)\n                ans.add(mat[top][i]);\n\n            top++;\n\n            // For moving top to bottom.\n            for (int i = top; i <= bottom; i++)\n                ans.add(mat[i][right]);\n\n            right--;\n\n            // For moving right to left.\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--)\n                    ans.add(mat[bottom][i]);\n\n                bottom--;\n            }\n\n            // For moving bottom to top.\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--)\n                    ans.add(mat[i][left]);\n\n                left++;\n            }\n        }\n        return ans;\n    }\n\n    public static void main(String[] args) {\n        \n        //Matrix initialization.\n        int[][] mat = {{1, 2, 3, 4},\n                       {5, 6, 7, 8},\n                       {9, 10, 11, 12},\n                       {13, 14, 15, 16}};\n        \n        List<Integer> ans = printSpiral(mat);\n\n        for(int i = 0;i<ans.size();i++){\n            System.out.print(ans.get(i) + \" \");\n        }\n\n        System.out.println();\n    }\n}",
    "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    \n    public static List<Integer> printSpiral(int[][] mat) {\n        \n        // Define ans list to store the result.\n        List<Integer> ans = new ArrayList<>();\n        \n        int n = mat.length; // no. of rows\n        int m = mat[0].length; // no. of columns\n        \n        // Initialize the pointers required for traversal.\n        int top = 0, left = 0, bottom = n - 1, right = m - 1;\n\n        // Loop until all elements are not traversed.\n        while (top <= bottom && left <= right) {\n\n            // For moving left to right\n            for (int i = left; i <= right; i++)\n                ans.add(mat[top][i]);\n\n            top++;\n\n            // For moving top to bottom.\n            for (int i = top; i <= bottom; i++)\n                ans.add(mat[i][right]);\n\n            right--;\n\n            // For moving right to left.\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--)\n                    ans.add(mat[bottom][i]);\n\n                bottom--;\n            }\n\n            // For moving bottom to top.\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--)\n                    ans.add(mat[i][left]);\n\n                left++;\n            }\n        }\n        return ans;\n    }\n\n    public static void main(String[] args) {\n        \n        //Matrix initialization.\n        int[][] mat = {{1, 2, 3, 4},\n                       {5, 6, 7, 8},\n                       {9, 10, 11, 12},\n                       {13, 14, 15, 16}};\n        \n        List<Integer> ans = printSpiral(mat);\n\n        for(int i = 0;i<ans.size();i++){\n            System.out.print(ans.get(i) + \" \");\n        }\n\n        System.out.println();\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-054": {
    "notes": "class Solution {\n    public int[] rearrangeArray(int[] nums) {\n\n        int[] result = new int[nums.length];\n        int pos = 0, neg = 1;\n\n        for (int num : nums) {\n            if (num > 0) {\n                result[pos] = num;\n                pos += 2;\n            } else {\n                result[neg] = num;\n                neg += 2;\n            }\n        }\n        return result;\n    }\n}",
    "code": "class Solution {\n    public int[] rearrangeArray(int[] nums) {\n\n        int[] result = new int[nums.length];\n        int pos = 0, neg = 1;\n\n        for (int num : nums) {\n            if (num > 0) {\n                result[pos] = num;\n                pos += 2;\n            } else {\n                result[neg] = num;\n                neg += 2;\n            }\n        }\n        return result;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-059": {
    "notes": "class Solution {\n    public void rotate(int[][] matrix) {\n        int n=matrix.length;\n        int m=matrix[0].length;\n        for(int i=0;i<n;i++){\n            for(int j=i+1;j<m;j++){\n                int t=matrix[i][j];\n                matrix[i][j]=matrix[j][i];\n                matrix[j][i]=t;\n            }\n        }\n        for(int i=0;i<n;i++){\n            int l=0;\n            int r=m-1;\n            while(l<=r){\n                int t=matrix[i][l];\n                matrix[i][l]=matrix[i][r];\n                matrix[i][r]=t;\n                 l++;\n            r--;\n            }\n           \n        }\n    }\n}",
    "code": "class Solution {\n    public void rotate(int[][] matrix) {\n        int n=matrix.length;\n        int m=matrix[0].length;\n        for(int i=0;i<n;i++){\n            for(int j=i+1;j<m;j++){\n                int t=matrix[i][j];\n                matrix[i][j]=matrix[j][i];\n                matrix[j][i]=t;\n            }\n        }\n        for(int i=0;i<n;i++){\n            int l=0;\n            int r=m-1;\n            while(l<=r){\n                int t=matrix[i][l];\n                matrix[i][l]=matrix[i][r];\n                matrix[i][r]=t;\n                 l++;\n            r--;\n            }\n           \n        }\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-050": {
    "notes": "import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int n, int []arr, int target) {\n        int[] ans = new int[2];\n        ans[0] = ans[1] = -1;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (arr[i] + arr[j] == target) {\n                    ans[0] = i;\n                    ans[1] = j;\n                    return ans;\n                }\n            }\n        }\n        return ans;\n    }\n\n    public static void main(String args[]) {\n        int n = 5;\n        int[] arr = {2, 6, 5, 8, 11};\n        int target = 14;\n        int[] ans = twoSum(n, arr, target);\n        System.out.println(\"This is the answer for variant 2: [\" + ans[0] + \", \"\n                           + ans[1] + \"]\");\n    }\n\n}",
    "code": "import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int n, int []arr, int target) {\n        int[] ans = new int[2];\n        ans[0] = ans[1] = -1;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (arr[i] + arr[j] == target) {\n                    ans[0] = i;\n                    ans[1] = j;\n                    return ans;\n                }\n            }\n        }\n        return ans;\n    }\n\n    public static void main(String args[]) {\n        int n = 5;\n        int[] arr = {2, 6, 5, 8, 11};\n        int target = 14;\n        int[] ans = twoSum(n, arr, target);\n        System.out.println(\"This is the answer for variant 2: [\" + ans[0] + \", \"\n                           + ans[1] + \"]\");\n    }\n\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-042": {
    "notes": "class Solution {\n    public void rotate(int[] nums, int k){\n     k=k%nums.length;\n     rev(nums,0,nums.length-1);\n     rev(nums ,0,k-1);\n     rev(nums,k,nums.length-1);\n    }\n    public void rev(int nums[],int l,int r){\n        while(l<=r){\n            int t=nums[l];\n            nums[l]=nums[r];\n            nums[r]=t;\n            l++;\n            r--;\n        }\n    }\n    \n    }\n--------------------------------------------------------------------------------------\nclass Solution {\n    public void rotateLeft(int[] nums, int k) {\n        if (nums.length == 0) return;\n\n        k = k % nums.length;   // handle k > n\n\n        rev(nums, 0, k - 1);\n        rev(nums, k, nums.length - 1);\n        rev(nums, 0, nums.length - 1);\n    }\n\n    public void rev(int[] nums, int l, int r) {\n        while (l < r) {\n            int t = nums[l];\n            nums[l] = nums[r];\n            nums[r] = t;\n            l++;\n            r--;\n        }\n    }\n}",
    "code": "class Solution {\n    public void rotate(int[] nums, int k){\n     k=k%nums.length;\n     rev(nums,0,nums.length-1);\n     rev(nums ,0,k-1);\n     rev(nums,k,nums.length-1);\n    }\n    public void rev(int nums[],int l,int r){\n        while(l<=r){\n            int t=nums[l];\n            nums[l]=nums[r];\n            nums[r]=t;\n            l++;\n            r--;\n        }\n    }\n    \n    }\n--------------------------------------------------------------------------------------\nclass Solution {\n    public void rotateLeft(int[] nums, int k) {\n        if (nums.length == 0) return;\n\n        k = k % nums.length;   // handle k > n\n\n        rev(nums, 0, k - 1);\n        rev(nums, k, nums.length - 1);\n        rev(nums, 0, nums.length - 1);\n    }\n\n    public void rev(int[] nums, int l, int r) {\n        while (l < r) {\n            int t = nums[l];\n            nums[l] = nums[r];\n            nums[r] = t;\n            l++;\n            r--;\n        }\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-048": {
    "notes": "class Solution {\n    public int findMaxConsecutiveOnes(int[] nums) {\n        int maxCount = 0;\n        int currentCount = 0;\n        \n        for (int num : nums) {\n            if (num == 1) {\n                currentCount++;\n                maxCount = Math.max(maxCount, currentCount);\n            } else {\n                currentCount = 0;\n            }\n        }\n        \n        return maxCount;\n    }\n}",
    "code": "class Solution {\n    public int findMaxConsecutiveOnes(int[] nums) {\n        int maxCount = 0;\n        int currentCount = 0;\n        \n        for (int num : nums) {\n            if (num == 1) {\n                currentCount++;\n                maxCount = Math.max(maxCount, currentCount);\n            } else {\n                currentCount = 0;\n            }\n        }\n        \n        return maxCount;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-039": {
    "notes": "import java.io.*;\nclass Test\n{\nstatic private int secondSmallest(int[] arr, int n)\n{\n\tif (n < 2)\n\t{\n\t\treturn -1;\n\t}\n\tint small = Integer.MAX_VALUE;\n\tint second_small = Integer.MAX_VALUE;\n\tint i;\n\tfor (i = 0; i < n; i++)\n\t{\n\t   if (arr[i] < small)\n\t   {\n\t\t  second_small = small;\n\t\t  small = arr[i];\n\t   }\n\t   else if (arr[i] < second_small && arr[i] != small)\n\t   {\n\t\t  second_small = arr[i];\n\t   }\n\t}\n   return second_small;\n}\nstatic private int secondLargest(int[] arr, int n)\n{\n\tif(n<2)\n\treturn -1;\n\tint large = Integer.MIN_VALUE;\n\tint second_large = Integer.MIN_VALUE;\n\tint i;\n\tfor (i = 0; i < n; i++)\n\t{\n\t\tif (arr[i] > large)\n\t\t{\n\t\t\tsecond_large = large;\n\t\t\tlarge = arr[i];\n\t\t}\n\n\t\telse if (arr[i] > second_large && arr[i] != large)\n\t\t{\n\t\t\tsecond_large = arr[i];\n\t\t}\n\t}\n\treturn second_large;\n}\n\npublic static void main(String[] args)\n{\n\tint[] arr = {1, 2, 4, 7, 7, 5};\n\tint n = arr.length;\n\t\tint sS = secondSmallest(arr, n);\n\t\tint sL = secondLargest(arr, n);\n\tSystem.out.println(\"Second smallest is \"+sS);\n\tSystem.out.println(\"Second largest is \"+sL);\n}\n\n}",
    "code": "import java.io.*;\nclass Test\n{\nstatic private int secondSmallest(int[] arr, int n)\n{\n\tif (n < 2)\n\t{\n\t\treturn -1;\n\t}\n\tint small = Integer.MAX_VALUE;\n\tint second_small = Integer.MAX_VALUE;\n\tint i;\n\tfor (i = 0; i < n; i++)\n\t{\n\t   if (arr[i] < small)\n\t   {\n\t\t  second_small = small;\n\t\t  small = arr[i];\n\t   }\n\t   else if (arr[i] < second_small && arr[i] != small)\n\t   {\n\t\t  second_small = arr[i];\n\t   }\n\t}\n   return second_small;\n}\nstatic private int secondLargest(int[] arr, int n)\n{\n\tif(n<2)\n\treturn -1;\n\tint large = Integer.MIN_VALUE;\n\tint second_large = Integer.MIN_VALUE;\n\tint i;\n\tfor (i = 0; i < n; i++)\n\t{\n\t\tif (arr[i] > large)\n\t\t{\n\t\t\tsecond_large = large;\n\t\t\tlarge = arr[i];\n\t\t}\n\n\t\telse if (arr[i] > second_large && arr[i] != large)\n\t\t{\n\t\t\tsecond_large = arr[i];\n\t\t}\n\t}\n\treturn second_large;\n}\n\npublic static void main(String[] args)\n{\n\tint[] arr = {1, 2, 4, 7, 7, 5};\n\tint n = arr.length;\n\t\tint sS = secondSmallest(arr, n);\n\t\tint sL = secondLargest(arr, n);\n\tSystem.out.println(\"Second smallest is \"+sS);\n\tSystem.out.println(\"Second largest is \"+sL);\n}\n\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-047": {
    "notes": "class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int sum = n*(n+1)/2;\n        int news= 0;\n        for(int i = 0;i<nums.length;i++){\n            news+=nums[i];\n        }\n    return sum-news;}\n}",
    "code": "class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int sum = n*(n+1)/2;\n        int news= 0;\n        for(int i = 0;i<nums.length;i++){\n            news+=nums[i];\n        }\n    return sum-news;}\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-044": {
    "notes": "class Solution {\n    \npublic void moveZeroes(int[] nums) {\n    if (nums == null || nums.length == 0) return;        \n\n    int insertPos = 0;\n    for (int num: nums) {\n        if (num != 0) nums[insertPos++] = num;\n    }        \n\n    while (insertPos < nums.length) {\n        nums[insertPos++] = 0;\n    }\n}\n}",
    "code": "class Solution {\n    \npublic void moveZeroes(int[] nums) {\n    if (nums == null || nums.length == 0) return;        \n\n    int insertPos = 0;\n    for (int num: nums) {\n        if (num != 0) nums[insertPos++] = num;\n    }        \n\n    while (insertPos < nums.length) {\n        nums[insertPos++] = 0;\n    }\n}\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-046": {
    "notes": "Input:\nn = 5,m = 5.\narr1[] = {1,2,3,4,5}  \narr2[] = {2,3,4,4,5}\nOutput:\n {1,2,3,4,5}\n\nimport java.util.*;\n\nclass TUF{\nstatic ArrayList<Integer> FindUnion(int arr1[], int arr2[], int n, int m) {\n  HashMap <Integer,Integer > freq=new HashMap<>();\n  ArrayList<Integer> Union=new ArrayList<>();\n  for (int i = 0; i < n; i++)\n    freq.put(arr1[i],freq.getOrDefault(arr1[i],0)+1);\n    \n  for (int i = 0; i < m; i++)\n    freq.put(arr2[i],freq.getOrDefault(arr2[i],0)+1);\n  for (int it: freq.keySet())\n    Union.add(it);\n  return Union;\n}\n\npublic static void main(String args[]) {\n  int n = 10, m = 7;\n  int arr1[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\n  int arr2[] = {2, 3, 4, 4, 5, 11, 12};\n  ArrayList<Integer> Union = FindUnion(arr1, arr2, n, m);\n  System.out.println(\"Union of arr1 and arr2 is \");\n  for (int val: Union)\n    System.out.print(val+\" \");\n}\n}",
    "code": "Input:\nn = 5,m = 5.\narr1[] = {1,2,3,4,5}  \narr2[] = {2,3,4,4,5}\nOutput:\n {1,2,3,4,5}\n\nimport java.util.*;\n\nclass TUF{\nstatic ArrayList<Integer> FindUnion(int arr1[], int arr2[], int n, int m) {\n  HashMap <Integer,Integer > freq=new HashMap<>();\n  ArrayList<Integer> Union=new ArrayList<>();\n  for (int i = 0; i < n; i++)\n    freq.put(arr1[i],freq.getOrDefault(arr1[i],0)+1);\n    \n  for (int i = 0; i < m; i++)\n    freq.put(arr2[i],freq.getOrDefault(arr2[i],0)+1);\n  for (int it: freq.keySet())\n    Union.add(it);\n  return Union;\n}\n\npublic static void main(String args[]) {\n  int n = 10, m = 7;\n  int arr1[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\n  int arr2[] = {2, 3, 4, 4, 5, 11, 12};\n  ArrayList<Integer> Union = FindUnion(arr1, arr2, n, m);\n  System.out.println(\"Union of arr1 and arr2 is \");\n  for (int val: Union)\n    System.out.print(val+\" \");\n}\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-086": {
    "notes": "import java.util.*;\n\npublic class tUf {\n    public static boolean canWePlace(int[] stalls, int dist, int cows) {\n        int n = stalls.length; //size of array\n        int cntCows = 1; //no. of cows placed\n        int last = stalls[0]; //position of last placed cow.\n        for (int i = 1; i < n; i++) {\n            if (stalls[i] - last >= dist) {\n                cntCows++; //place next cow.\n                last = stalls[i]; //update the last location.\n            }\n            if (cntCows >= cows) return true;\n        }\n        return false;\n    }\n    public static int aggressiveCows(int[] stalls, int k) {\n        int n = stalls.length; //size of array\n        //sort the stalls[]:\n        Arrays.sort(stalls);\n\n        int low = 1, high = stalls[n - 1] - stalls[0];\n        //apply binary search:\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            if (canWePlace(stalls, mid, k) == true) {\n                low = mid + 1;\n            } else high = mid - 1;\n        }\n        return high;\n    }\n    public static void main(String[] args) {\n        int[] stalls = {0, 3, 4, 7, 10, 9};\n        int k = 4;\n        int ans = aggressiveCows(stalls, k);\n        System.out.println(\"The maximum possible minimum distance is: \" + ans);\n    }\n}",
    "code": "import java.util.*;\n\npublic class tUf {\n    public static boolean canWePlace(int[] stalls, int dist, int cows) {\n        int n = stalls.length; //size of array\n        int cntCows = 1; //no. of cows placed\n        int last = stalls[0]; //position of last placed cow.\n        for (int i = 1; i < n; i++) {\n            if (stalls[i] - last >= dist) {\n                cntCows++; //place next cow.\n                last = stalls[i]; //update the last location.\n            }\n            if (cntCows >= cows) return true;\n        }\n        return false;\n    }\n    public static int aggressiveCows(int[] stalls, int k) {\n        int n = stalls.length; //size of array\n        //sort the stalls[]:\n        Arrays.sort(stalls);\n\n        int low = 1, high = stalls[n - 1] - stalls[0];\n        //apply binary search:\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            if (canWePlace(stalls, mid, k) == true) {\n                low = mid + 1;\n            } else high = mid - 1;\n        }\n        return high;\n    }\n    public static void main(String[] args) {\n        int[] stalls = {0, 3, 4, 7, 10, 9};\n        int k = 4;\n        int ans = aggressiveCows(stalls, k);\n        System.out.println(\"The maximum possible minimum distance is: \" + ans);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-076": {
    "notes": "Example 1:\nInput Format: arr = [4,5,6,7,0,1,2,3]\nResult: 4\nExplanation: The original array should be [0,1,2,3,4,5,6,7]. So, we can notice that the array has been rotated 4 times.\n\nExample 2:\nInput Format: arr = [3,4,5,1,2]\nResult: 3\nExplanation: The original array should be [1,2,3,4,5]. So, we can notice that the array has been rotated 3 times.\n\nFind min ele\nprint idx",
    "code": "Example 1:\nInput Format: arr = [4,5,6,7,0,1,2,3]\nResult: 4\nExplanation: The original array should be [0,1,2,3,4,5,6,7]. So, we can notice that the array has been rotated 4 times.\n\nExample 2:\nInput Format: arr = [3,4,5,1,2]\nResult: 3\nExplanation: The original array should be [1,2,3,4,5]. So, we can notice that the array has been rotated 3 times.\n\nFind min ele\nprint idx",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-311": {
    "notes": "class Solution {\n    TreeNode prev=null,f=null,s=null;\n    public void recoverTree(TreeNode root) {\n        if(root==null) return;\n        inorder(root);\n        int t=f.val;\n        f.val=s.val;\n        s.val=t;\n    }\n    public void inorder(TreeNode root){\n        if(root==null){\n            return;\n        }\n        inorder(root.left);\n        if(prev!=null&&root.val<prev.val){\n            if(f==null)\n            f=prev;\n            s=root;\n        }\n        prev=root;\n        inorder(root.right);\n    }\n}",
    "code": "class Solution {\n    TreeNode prev=null,f=null,s=null;\n    public void recoverTree(TreeNode root) {\n        if(root==null) return;\n        inorder(root);\n        int t=f.val;\n        f.val=s.val;\n        s.val=t;\n    }\n    public void inorder(TreeNode root){\n        if(root==null){\n            return;\n        }\n        inorder(root.left);\n        if(prev!=null&&root.val<prev.val){\n            if(f==null)\n            f=prev;\n            s=root;\n        }\n        prev=root;\n        inorder(root.right);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-309": {
    "notes": "class Solution {\n    int i=0;\n    public TreeNode bstFromPreorder(int[] preorder) {\n        return func(preorder,Integer.MIN_VALUE,Integer.MAX_VALUE);\n    }\n    public TreeNode func(int[] preorder,int min,int max){\n        if(i==preorder.length||preorder[i]<min||preorder[i]>max)\n        return null;\n      int val=preorder[i++];\n      TreeNode node=new TreeNode(val);\n      node.left=func(preorder,min,val);\n      node.right=func(preorder,val,max);\n      return node;\n    }\n}",
    "code": "class Solution {\n    int i=0;\n    public TreeNode bstFromPreorder(int[] preorder) {\n        return func(preorder,Integer.MIN_VALUE,Integer.MAX_VALUE);\n    }\n    public TreeNode func(int[] preorder,int min,int max){\n        if(i==preorder.length||preorder[i]<min||preorder[i]>max)\n        return null;\n      int val=preorder[i++];\n      TreeNode node=new TreeNode(val);\n      node.left=func(preorder,min,val);\n      node.right=func(preorder,val,max);\n      return node;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-307": {
    "notes": "class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        if(root!=null){\n            if(key<root.val){\n                root.left=deleteNode(root.left,key);\n            }\n            else if(key>root.val){\n                root.right=deleteNode(root.right,key);\n            }\n            else{\n                if(root.left==null&&root.right==null){\n                    return null;\n                }\n                if(root.left==null||root.right==null){\n                    return (root.left!=null)?root.left:root.right;\n                }\n                TreeNode temp=root.left;\n                while(temp.right!=null){\n                    temp=temp.right;\n                }\n                root.val=temp.val;\n                root.left=deleteNode(root.left,temp.val);\n            }\n        }\n        return root;\n    }\n}",
    "code": "class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        if(root!=null){\n            if(key<root.val){\n                root.left=deleteNode(root.left,key);\n            }\n            else if(key>root.val){\n                root.right=deleteNode(root.right,key);\n            }\n            else{\n                if(root.left==null&&root.right==null){\n                    return null;\n                }\n                if(root.left==null||root.right==null){\n                    return (root.left!=null)?root.left:root.right;\n                }\n                TreeNode temp=root.left;\n                while(temp.right!=null){\n                    temp=temp.right;\n                }\n                root.val=temp.val;\n                root.left=deleteNode(root.left,temp.val);\n            }\n        }\n        return root;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-305": {
    "notes": "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        List<Integer> li=new ArrayList<>();\n        inn(root,li);\n        int t=Integer.MIN_VALUE;\n        for(int i=0;i<k;i++){\n          t=li.get(i);\n        }\n        return t;\n    }\n    public void inn(TreeNode root,List<Integer> li){\n        if(root==null) return;\n        inn(root.left,li);\n        li.add(root.val);\n        inn(root.right,li);\n    }\n}",
    "code": "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        List<Integer> li=new ArrayList<>();\n        inn(root,li);\n        int t=Integer.MIN_VALUE;\n        for(int i=0;i<k;i++){\n          t=li.get(i);\n        }\n        return t;\n    }\n    public void inn(TreeNode root,List<Integer> li){\n        if(root==null) return;\n        inn(root.left,li);\n        li.add(root.val);\n        inn(root.right,li);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-040": {
    "notes": "class TUF {\n  static boolean isSorted(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n      if (arr[i] < arr[i - 1])\n        return false;\n    }\n\n    return true;\n  }\n\n  public static void main(String args[]) {\n    int arr[] = {1, 2, 3, 4, 5}, n = 5;\n\n    System.out.println(isSorted(arr, n));\n  }\n}",
    "code": "class TUF {\n  static boolean isSorted(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n      if (arr[i] < arr[i - 1])\n        return false;\n    }\n\n    return true;\n  }\n\n  public static void main(String args[]) {\n    int arr[] = {1, 2, 3, 4, 5}, n = 5;\n\n    System.out.println(isSorted(arr, n));\n  }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-200": {
    "notes": "class MyQueue {\n     Stack <Integer> ip;\n     Stack <Integer> op;\n    public MyQueue() {\n        ip=new Stack<>();\n        op=new Stack<>();\n    }\n    \n    public void push(int x) {\n        while(ip.isEmpty()==false){\n            op.push(ip.peek());\n            ip.pop();\n\n        }\n        ip.push(x);\n        while(op.isEmpty()==false){\n           ip.push(op.peek());\n           op.pop();\n        }\n    }\n    \n    public int pop() {\n        return ip.pop();\n    }\n    \n    public int peek() {\n        return ip.peek();\n    }\n    \n    public boolean empty() {\n        return ip.isEmpty();\n    }\n}",
    "code": "class MyQueue {\n     Stack <Integer> ip;\n     Stack <Integer> op;\n    public MyQueue() {\n        ip=new Stack<>();\n        op=new Stack<>();\n    }\n    \n    public void push(int x) {\n        while(ip.isEmpty()==false){\n            op.push(ip.peek());\n            ip.pop();\n\n        }\n        ip.push(x);\n        while(op.isEmpty()==false){\n           ip.push(op.peek());\n           op.pop();\n        }\n    }\n    \n    public int pop() {\n        return ip.pop();\n    }\n    \n    public int peek() {\n        return ip.peek();\n    }\n    \n    public boolean empty() {\n        return ip.isEmpty();\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-199": {
    "notes": "class MyStack {\n    Queue<Integer> q=new LinkedList<>();\n    public MyStack() {\n        \n    }\n    \n    public void push(int x) {\n        q.add(x);\n        for(int i=0;i<q.size()-1;i++){\n            q.add(q.remove());\n        }\n    }\n    \n    public int pop() {\n        return q.remove();\n    }\n    \n    public int top() {\n        return q.peek();\n    }\n    \n    public boolean empty() {\n        return q.isEmpty();\n    }\n}",
    "code": "class MyStack {\n    Queue<Integer> q=new LinkedList<>();\n    public MyStack() {\n        \n    }\n    \n    public void push(int x) {\n        q.add(x);\n        for(int i=0;i<q.size()-1;i++){\n            q.add(q.remove());\n        }\n    }\n    \n    public int pop() {\n        return q.remove();\n    }\n    \n    public int top() {\n        return q.peek();\n    }\n    \n    public boolean empty() {\n        return q.isEmpty();\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911281
  },
  "p-112": {
    "notes": "class Solution {\n      // Method to check if two strings are isomorphic\n      public boolean isomorphicString(String s, String t) {\n          // Arrays to track last seen positions of characters in s and t\n          int[] m1 = new int[256], m2 = new int[256];\n  \n          // Get length of the strings\n          int n = s.length();\n  \n          // Loop through all characters in the strings\n          for (int i = 0; i < n; ++i) {\n              // Return false if mapping is inconsistent\n              if (m1[s.charAt(i)] != m2[t.charAt(i)]) return false;\n  \n              // Update last seen index for both characters\n              m1[s.charAt(i)] = i + 1;\n              m2[t.charAt(i)] = i + 1;\n          }\n  \n          // Return true if all character mappings are consistent\n          return true;\n      }\n  }\n  \n  public class Main {\n      public static void main(String[] args) {\n          // Create instance of Solution class\n          Solution solution = new Solution();\n  \n          // Define input strings\n          String s = \"paper\";\n          String t = \"title\";\n  \n          // Check if strings are isomorphic\n          if (solution.isomorphicString(s, t)) {\n              System.out.println(\"Strings are isomorphic.\");\n          } else {\n              System.out.println(\"Strings are not isomorphic.\");\n          }\n      }\n  }",
    "code": "class Solution {\n      // Method to check if two strings are isomorphic\n      public boolean isomorphicString(String s, String t) {\n          // Arrays to track last seen positions of characters in s and t\n          int[] m1 = new int[256], m2 = new int[256];\n  \n          // Get length of the strings\n          int n = s.length();\n  \n          // Loop through all characters in the strings\n          for (int i = 0; i < n; ++i) {\n              // Return false if mapping is inconsistent\n              if (m1[s.charAt(i)] != m2[t.charAt(i)]) return false;\n  \n              // Update last seen index for both characters\n              m1[s.charAt(i)] = i + 1;\n              m2[t.charAt(i)] = i + 1;\n          }\n  \n          // Return true if all character mappings are consistent\n          return true;\n      }\n  }\n  \n  public class Main {\n      public static void main(String[] args) {\n          // Create instance of Solution class\n          Solution solution = new Solution();\n  \n          // Define input strings\n          String s = \"paper\";\n          String t = \"title\";\n  \n          // Check if strings are isomorphic\n          if (solution.isomorphicString(s, t)) {\n              System.out.println(\"Strings are isomorphic.\");\n          } else {\n              System.out.println(\"Strings are not isomorphic.\");\n          }\n      }\n  }",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-110": {
    "notes": "class Solution {\n    public String largestOddNumber(String num) {\n        if((int)num.charAt(num.length()-1)%2==1) return num;\n        int i=num.length()-1;\n        while(i>=0){\n            int n=num.charAt(i);\n            if(n%2==1) return num.substring(0,i+1);\n            i--;\n        }\n        return \"\";\n    }\n}",
    "code": "class Solution {\n    public String largestOddNumber(String num) {\n        if((int)num.charAt(num.length()-1)%2==1) return num;\n        int i=num.length()-1;\n        while(i>=0){\n            int n=num.charAt(i);\n            if(n%2==1) return num.substring(0,i+1);\n            i--;\n        }\n        return \"\";\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-111": {
    "notes": "class Solution {\n    public String longestCommonPrefix(String[] v) {\n        StringBuilder ans = new StringBuilder();\n        Arrays.sort(v);\n        String first = v[0];\n        String last = v[v.length-1];\n        for (int i=0; i<Math.min(first.length(), last.length()); i++) {\n            if (first.charAt(i) != last.charAt(i)) {\n                return ans.toString();\n            }\n            ans.append(first.charAt(i));\n        }\n        return ans.toString();\n    }\n}",
    "code": "class Solution {\n    public String longestCommonPrefix(String[] v) {\n        StringBuilder ans = new StringBuilder();\n        Arrays.sort(v);\n        String first = v[0];\n        String last = v[v.length-1];\n        for (int i=0; i<Math.min(first.length(), last.length()); i++) {\n            if (first.charAt(i) != last.charAt(i)) {\n                return ans.toString();\n            }\n            ans.append(first.charAt(i));\n        }\n        return ans.toString();\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-113": {
    "notes": "class Solution {\n    public boolean isRotation(String s1, String s2) {\n        if (s1.length() != s2.length()) return false;\n        String temp = s1 + s1;\n        return temp.contains(s2);\n    }\n\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        System.out.println(sol.isRotation(\"abcd\", \"cdab\")); // true\n        System.out.println(sol.isRotation(\"aab\", \"aba\"));   // true\n        System.out.println(sol.isRotation(\"abcd\", \"acbd\")); // false\n    }\n}",
    "code": "class Solution {\n    public boolean isRotation(String s1, String s2) {\n        if (s1.length() != s2.length()) return false;\n        String temp = s1 + s1;\n        return temp.contains(s2);\n    }\n\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        System.out.println(sol.isRotation(\"abcd\", \"cdab\")); // true\n        System.out.println(sol.isRotation(\"aab\", \"aba\"));   // true\n        System.out.println(sol.isRotation(\"abcd\", \"acbd\")); // false\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-115": {
    "notes": "class Solution {\n    public String frequencySort(String s) {\n        HashMap<Character,Integer> hm=new HashMap<>();\n        for(char c:s.toCharArray()){\n            hm.put(c,hm.getOrDefault(c,0)+1);\n        }\n        PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->b[1]-a[1]);\n        for(Map.Entry<Character,Integer> en:hm.entrySet()){\n            pq.offer(new int[]{en.getKey(),en.getValue()});\n        }\n        String g=\"\";\n        while(!pq.isEmpty()){\n           int p[]= pq.poll();\n           char ch=(char)p[0];\n           int id=p[1];\n           for(int j=0;j<id;j++){\n              g+=ch;\n           }\n        }\n        return g;\n    }\n}",
    "code": "class Solution {\n    public String frequencySort(String s) {\n        HashMap<Character,Integer> hm=new HashMap<>();\n        for(char c:s.toCharArray()){\n            hm.put(c,hm.getOrDefault(c,0)+1);\n        }\n        PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->b[1]-a[1]);\n        for(Map.Entry<Character,Integer> en:hm.entrySet()){\n            pq.offer(new int[]{en.getKey(),en.getValue()});\n        }\n        String g=\"\";\n        while(!pq.isEmpty()){\n           int p[]= pq.poll();\n           char ch=(char)p[0];\n           int id=p[1];\n           for(int j=0;j<id;j++){\n              g+=ch;\n           }\n        }\n        return g;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-148": {
    "notes": "class Solution {\n    public static ArrayList<ArrayList<Integer>> findPairsWithGivenSum(int target, Node head) {\n        // code here\n        Node l=head;\n        Node r=head;\n        ArrayList<ArrayList<Integer>> li=new ArrayList<>();\n        while(r.next!=null){\n            r=r.next;\n        }\n        while(l.data<r.data){\n            if(l.data+r.data==target){\n                ArrayList<Integer> l1=new ArrayList<>();\n                l1.add(l.data);\n                l1.add(r.data);\n                li.add(l1);\n                l=l.next;\n                r=r.prev;\n            }\n            else if(l.data+r.data>target){\n                r=r.prev;\n            }\n            else{\n                l=l.next;\n            }\n        }\n        return li;\n    }\n}",
    "code": "class Solution {\n    public static ArrayList<ArrayList<Integer>> findPairsWithGivenSum(int target, Node head) {\n        // code here\n        Node l=head;\n        Node r=head;\n        ArrayList<ArrayList<Integer>> li=new ArrayList<>();\n        while(r.next!=null){\n            r=r.next;\n        }\n        while(l.data<r.data){\n            if(l.data+r.data==target){\n                ArrayList<Integer> l1=new ArrayList<>();\n                l1.add(l.data);\n                l1.add(r.data);\n                li.add(l1);\n                l=l.next;\n                r=r.prev;\n            }\n            else if(l.data+r.data>target){\n                r=r.prev;\n            }\n            else{\n                l=l.next;\n            }\n        }\n        return li;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-336": {
    "notes": "class Solution {\n    public int numIslands(char[][] grid) {\n        int c=0;\n        if(grid.length==0)\n        return 0;\n        for(int i=0;i<grid.length;i++){\n            for(int j=0;j<grid[0].length;j++){\n                if(grid[i][j]=='1'){\n                    dfs(grid,i,j);\n                    c++;\n                }\n            }\n        }\n        return c;\n    }\n    public void dfs(char grid[][],int i,int j){\n        if(i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]!='1')\n            return;\n        grid[i][j]='0';\n        dfs(grid,i-1,j);\n        dfs(grid,i,j-1);\n        dfs(grid,i+1,j);\n        dfs(grid,i,j+1);\n    }\n}",
    "code": "class Solution {\n    public int numIslands(char[][] grid) {\n        int c=0;\n        if(grid.length==0)\n        return 0;\n        for(int i=0;i<grid.length;i++){\n            for(int j=0;j<grid[0].length;j++){\n                if(grid[i][j]=='1'){\n                    dfs(grid,i,j);\n                    c++;\n                }\n            }\n        }\n        return c;\n    }\n    public void dfs(char grid[][],int i,int j){\n        if(i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j]!='1')\n            return;\n        grid[i][j]='0';\n        dfs(grid,i-1,j);\n        dfs(grid,i,j-1);\n        dfs(grid,i+1,j);\n        dfs(grid,i,j+1);\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-032": {
    "notes": "void bubbleSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped) break; // optimization\n    }\n}",
    "code": "void bubbleSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped) break; // optimization\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-033": {
    "notes": "void insertionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}",
    "code": "void insertionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-034": {
    "notes": "import java.util.Arrays;\n\npublic class MergeSort {\n\n    public static void main(String[] args) {\n        int[] arr = {8, 4, 6, 2, 9, 1};\n        System.out.println(\"Before Sorting: \" + Arrays.toString(arr));\n\n        mergeSort(arr, 0, arr.length - 1);\n\n        System.out.println(\"After Sorting:  \" + Arrays.toString(arr));\n    }\n\n    // Recursive merge sort\n    static void mergeSort(int[] arr, int start, int end) {\n        if (start >= end) return;\n\n        int mid = (start + end) / 2;\n\n        mergeSort(arr, start, mid);       // Sort left half\n        mergeSort(arr, mid + 1, end);     // Sort right half\n\n        merge(arr, start, mid, end);      // Merge the two halves\n    }\n\n    // Merge two sorted parts\n    static void merge(int[] arr, int start, int mid, int end) {\n        int[] mix = new int[end - start + 1];\n\n        int i = start;\n        int j = mid + 1;\n        int k = 0;\n\n        // Merge in ascending order\n        while (i <= mid && j <= end) {\n            if (arr[i] <= arr[j]) {   // Change to '>' for descending\n                mix[k++] = arr[i++];\n            } else {\n                mix[k++] = arr[j++];\n            }\n        }\n\n        // Copy remaining elements from left half\n        while (i <= mid) {\n            mix[k++] = arr[i++];\n        }\n\n        // Copy remaining elements from right half\n        while (j <= end) {\n            mix[k++] = arr[j++];\n        }\n\n        // Copy merged result back into original array\n        for (int l = 0; l < mix.length; l++) {\n            arr[start + l] = mix[l];\n        }\n    }\n}",
    "code": "import java.util.Arrays;\n\npublic class MergeSort {\n\n    public static void main(String[] args) {\n        int[] arr = {8, 4, 6, 2, 9, 1};\n        System.out.println(\"Before Sorting: \" + Arrays.toString(arr));\n\n        mergeSort(arr, 0, arr.length - 1);\n\n        System.out.println(\"After Sorting:  \" + Arrays.toString(arr));\n    }\n\n    // Recursive merge sort\n    static void mergeSort(int[] arr, int start, int end) {\n        if (start >= end) return;\n\n        int mid = (start + end) / 2;\n\n        mergeSort(arr, start, mid);       // Sort left half\n        mergeSort(arr, mid + 1, end);     // Sort right half\n\n        merge(arr, start, mid, end);      // Merge the two halves\n    }\n\n    // Merge two sorted parts\n    static void merge(int[] arr, int start, int mid, int end) {\n        int[] mix = new int[end - start + 1];\n\n        int i = start;\n        int j = mid + 1;\n        int k = 0;\n\n        // Merge in ascending order\n        while (i <= mid && j <= end) {\n            if (arr[i] <= arr[j]) {   // Change to '>' for descending\n                mix[k++] = arr[i++];\n            } else {\n                mix[k++] = arr[j++];\n            }\n        }\n\n        // Copy remaining elements from left half\n        while (i <= mid) {\n            mix[k++] = arr[i++];\n        }\n\n        // Copy remaining elements from right half\n        while (j <= end) {\n            mix[k++] = arr[j++];\n        }\n\n        // Copy merged result back into original array\n        for (int l = 0; l < mix.length; l++) {\n            arr[start + l] = mix[l];\n        }\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-037": {
    "notes": "public class QuickSortExample {\n\n    public static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high); \n            quickSort(arr, low, pi - 1); \n            quickSort(arr, pi + 1, high); \n        }\n    }\n\n  private static int partition(int[] arr, int low, int high) {\n        int pivot = arr [high]; \n        int i = low - 1; \n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n\n        return i + 1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {8, 4, 6, 2, 9, 1};\n        quickSort(arr, 0, arr.length - 1);\n\n        System.out.println(\"Quick Sorted:\");\n        for (int num : arr) System.out.print(num + \" \");\n    }\n}",
    "code": "public class QuickSortExample {\n\n    public static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high); \n            quickSort(arr, low, pi - 1); \n            quickSort(arr, pi + 1, high); \n        }\n    }\n\n  private static int partition(int[] arr, int low, int high) {\n        int pivot = arr [high]; \n        int i = low - 1; \n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n\n        return i + 1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {8, 4, 6, 2, 9, 1};\n        quickSort(arr, 0, arr.length - 1);\n\n        System.out.println(\"Quick Sorted:\");\n        for (int num : arr) System.out.print(num + \" \");\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  },
  "p-031": {
    "notes": "void selectionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int minIndex = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n        int temp = arr[minIndex];\n        arr[minIndex] = arr[i];\n        arr[i] = temp;\n    }\n}",
    "code": "void selectionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int minIndex = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n        int temp = arr[minIndex];\n        arr[minIndex] = arr[i];\n        arr[i] = temp;\n    }\n}",
    "language": "java",
    "status": "Solved",
    "revision": "No Revision",
    "timeComplexity": "",
    "spaceComplexity": "",
    "updatedAt": 1791313911282
  }
};

export function loadPersonalData(): PersonalDataStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      savePersonalData(DEFAULT_INITIAL_DATA);
      return { ...DEFAULT_INITIAL_DATA };
    }
    const parsed = JSON.parse(raw);
    let changed = false;
    for (const [k, v] of Object.entries(DEFAULT_INITIAL_DATA)) {
      if (!parsed[k] || !parsed[k].notes || parsed[k].notes.trim().length === 0) {
        parsed[k] = { ...(parsed[k] || {}), ...v };
        changed = true;
      }
    }
    if (changed) {
      savePersonalData(parsed);
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load personal tracker data from localStorage:', err);
    return { ...DEFAULT_INITIAL_DATA };
  }
}

export function savePersonalData(data: PersonalDataStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save personal tracker data to localStorage:', err);
  }
}

export function updateProblemPersonalData(
  problemId: string,
  partialData: Partial<PersonalProblemData>
): PersonalDataStore {
  const current = loadPersonalData();
  const existing = current[problemId] || {
    notes: '',
    code: '',
    language: 'java',
    status: 'Not Started',
    revision: 'No Revision',
    timeComplexity: '',
    spaceComplexity: ''
  };

  const updated: PersonalProblemData = {
    ...existing,
    ...partialData,
    updatedAt: Date.now()
  };

  current[problemId] = updated;
  savePersonalData(current);
  return { ...current };
}

export function exportBackup(data: PersonalDataStore): void {
  const payload = {
    app: 'Progress Tracker',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    totalProblemsTracked: Object.keys(data).length,
    data: data
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().split('T')[0];
  a.download = `progress_tracker_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackup(jsonString: string): { success: boolean; message: string; data?: PersonalDataStore } {
  try {
    const parsed = JSON.parse(jsonString);
    let incomingData: PersonalDataStore | null = null;

    if (parsed && typeof parsed === 'object') {
      if (parsed.data && typeof parsed.data === 'object') {
        incomingData = parsed.data;
      } else {
        incomingData = parsed;
      }
    }

    if (!incomingData) {
      return { success: false, message: 'Invalid backup file format.' };
    }

    const validated: PersonalDataStore = {};
    let validCount = 0;

    for (const [key, val] of Object.entries(incomingData)) {
      if (typeof val === 'object' && val !== null) {
        validated[key] = {
          notes: typeof val.notes === 'string' ? val.notes : '',
          code: typeof val.code === 'string' ? val.code : '',
          language: (val.language === 'cpp' || val.language === 'python') ? val.language : 'java',
          status: val.status || 'Not Started',
          revision: val.revision || 'No Revision',
          timeComplexity: typeof val.timeComplexity === 'string' ? val.timeComplexity : '',
          spaceComplexity: typeof val.spaceComplexity === 'string' ? val.spaceComplexity : '',
          updatedAt: val.updatedAt || Date.now()
        };
        validCount++;
      }
    }

    savePersonalData(validated);
    return {
      success: true,
      message: `Successfully imported backup with ${validCount} problem records.`,
      data: validated
    };
  } catch (err) {
    return {
      success: false,
      message: `Error reading backup file: ${(err as Error).message}`
    };
  }
}
