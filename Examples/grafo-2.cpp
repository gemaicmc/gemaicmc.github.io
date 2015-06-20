#include <bits/stdc++.h>
// #include <vector>
using namespace std;
const int N = 4;
vector<int> adj[N];

int main (void) {
	adj[1].push_back(2);
	adj[2].push_back(1);
	adj[3].push_back(2);
	adj[2].push_back(3);
}
