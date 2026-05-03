t = int(input())
for _ in range(t):
    n = int(input())

    # 如果是奇数，或者小于最小的飞船推进器数量4，则不可能
    if n % 2 != 0 or n < 4:
        print(-1)
    else:
        # 求最大值：尽可能多用 4 (Type A)
        # 如果 n 能被 4 整除，全是 A；如果余 2，拿一个 6 (Type B) 剩下的全是 4
        max_crafts = n // 4 + (n % 4) // 2

        # 求最小值：尽可能多用 6 (Type B)
        # 这是一个向上取整的逻辑，等价于 (n + 6 - 1) // 6
        min_crafts = (n + 5) // 6

        print(min_crafts, max_crafts)