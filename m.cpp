
#include <bits/stdc++.h>
using namespace std;

// Function to generate the KMP 'next' array for string pattern matching
vector<int> buildNextArray(const string &pattern) {
    int m = pattern.length();
    vector<int> next(m);
    int length = 0;
    next[0] = 0; // first position always zero

    for (int i = 1; i < m;) {
        if (pattern[i] == pattern[length]) {
            next[i++] = ++length;
        } else if (length > 0) {
            length = next[length - 1];
        } else {
            next[i++] = 0;
        }
    }
    return next;
}

// Helper function to recursively reconstruct the answer
string backtrack(const vector<vector<pair<int, char>>> &dp, int len, int state) {
    return len > 0 ? (backtrack(dp, len - 1, dp[len][state].first) + dp[len][state].second) : "";
}

// Main solver function to find the resultant string based on conditions
string solve(string &s1, string &s2) {
    int n = s1.size(), m = s2.size(), totalLen = n + m - 1;
    string result(totalLen, '?');

    // Fill the result string based on 'T' positions in s2
    for (int i = 0; i < m; ++i) {
        if (s2[i] == 'T') {
            for (int j = 0; j < n; ++j) {
                if (result[i + j] != '?' && result[i + j] != s1[j]) {
                    return "-1";
                }
                result[i + j] = s1[j];
            }
        }
    }

    // Precompute the KMP 'next' array for s1
    vector<int> next = buildNextArray(s1);

    // Initialize DP table and BFS queue
    vector<vector<pair<int, char>>> dp(totalLen + 1, vector<pair<int, char>>(totalLen + 1, {-1, '-'}));
    queue<int> q;
    q.push(0);

    // BFS search
    for (int i = 0; i < totalLen; ++i) {
        char startChar = result[i] == '?' ? 'A' : result[i];
        char endChar = result[i] == '?' ? 'B' : result[i];

        int qSize = q.size();
        while (qSize--) {
            int currentState = q.front();
            q.pop();

            for (char c = startChar; c <= endChar; ++c) {
                int nextState = (currentState == n) ? next[currentState - 1] : currentState;

                // Move nextState while mismatch occurs
                while (nextState && c != s1[nextState]) {
                    nextState = next[nextState - 1];
                }

                int tempState = (c == s1[nextState]) ? (nextState + 1) : 0;

                // Skip invalid states
                if ((i >= n - 1 && s2[i - n + 1] == 'F' && tempState == n) || dp[i + 1][tempState].first >= 0) {
                    continue;
                }

                dp[i + 1][tempState] = {currentState, c};

                // If reached the end, backtrack to form the result
                if (i + 1 == totalLen) {
                    return backtrack(dp, totalLen, tempState);
                }

                q.push(tempState);
            }
        }
    }

    return "-1"; // If no valid solution is found
}

