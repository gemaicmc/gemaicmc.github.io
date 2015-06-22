#include <bits/stdc++.h>

using namespace std;

const int N = 1000;
vector <int> g[N];
bool vis[N];

void dfs (int x) {
	vis[x] = true;
	for (int i = 0; i < g[x].size(); ++i) {
		int y = g[x][i];
		if (!vis[y]) dfs(y);
	}
}