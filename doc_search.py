"""
Knuth-Morris-Pratt (KMP) Algorithm Implementation
Reference: https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm

"""
def partial_match_table(W):
    """Partial match table/failure function"""
    # I: W (pattern/word to be analyzed)
    # O: T (array of ints)

    pos = 1 # current position we are computing in T
    cnd = 0 # zero-based index in W of the next character of the current candidate substring

    T = [0] * (len(W) + 1) # table
    T[0] = -1

    while pos < len(W):
        if W[pos] == W[cnd]:
            T[pos] = T[cnd]
        
        else: 
            T[pos] = cnd
            cnd = T[cnd]

            while cnd >= 0 and W[pos] != W[cnd]:
                cnd = T[cnd]
        pos += 1
        cnd += 1
    
    T[pos] = cnd

    return T








