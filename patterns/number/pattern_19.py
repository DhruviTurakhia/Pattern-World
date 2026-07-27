def Pattern_Programs(n):
	hh=n
	osp=n-1
	for i in range(1,n+1):
		print(" "*osp,end="")
		for j in range(hh,n+1):
			print(j,end=" ")
		print()
		hh-=1
		osp-=1

if __name__ == '__main__':
	Pattern_Programs(int(input()))