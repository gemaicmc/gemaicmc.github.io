#include <bits/stdc++.h>

using namespace std;

// Número máximo de vértices
const int N = 100;
vector<int> g[N];
int indeg[N];

int main (void) {
	// Nro de vértices e arestas
	int n, m;
	cin >> n >> m;
	for (int i = 0; i < m; ++i) {
		// Variáveis de escopo local,
		// Só existem dentro do for
		int a, b;
		cin >> a >> b;
		g[a].push_back(b);
		indeg[b]++;
	}

	for (int i = 0; i < n; ++i) {
		// O grau de saída é o próprio g[i].size()
		cout << indeg[i] << " " << g[i].size() << " ";
		for (int j = 0; j < g[i].size(); ++j) {
			cout << g[i][j] << " ";
		}
		cout << endl;
	}
}