// Só precisa se preocupar com esse include na Maratona
// -- Inclui todas as bibliotecas principais do C++
#include <bits/stdc++.h>

const int N = 4;
int adj[N][N];

int main (void) {
	// Descenecessário, pois adj é global e é inicializada com 0
	memset (adj, 0, sizeof adj);

	adj[1][2] = adj[2][1] = 1;
	adj[2][3] = adj[3][2] = 1;
}
