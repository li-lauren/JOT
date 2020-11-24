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


def kmp_search(S, T, W):

    #I: string, S (text to be searched)
    #   string, W (word sought)
    #   partial_match_table, T (constructed from partial_match_table)
    #O: array of indices (P) where W is found in S; nP (number of positions)

    j = 0 # pos of current char in S
    k = 0 # pos of current char in W

    nP = 0
    P = []

    while j < len(S):
        if W[k] == S[j]:
            j += 1
            k += 1
            if k == len(W):
                # occurrence found
                P.append(j - k)
                nP += 1
                k = T[k]
        else:
            k = T[k]
            if k < 0:
                j += 1
                k += 1
    
    return nP, P








