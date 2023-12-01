import itertools
def remove_multi_list(lst):
    flattened_list = list(itertools.chain(*lst))
    return [float(item) for item in flattened_list]

def convert_list_to_dict(lst):
    return [{"data": [{"x": item[0], "y": item[1]} for item in lst]}]

def calculate_frequency(data, num_bins=10):
    max_val = max(data)
    min_val = min(data)
    range_val = max_val - min_val
    bin_size = range_val / num_bins

    frequency = {}

    for value in data:
        bin_index = int((value - min_val) / bin_size)
        bin_min = min_val + (bin_index * bin_size)
        bin_max = bin_min + bin_size
        bin_key = f"{bin_min:.2f}-{bin_max:.2f}"
        frequency[bin_key] = frequency.get(bin_key, 0) + 1

    return [{"x": bin, "y": count} for bin, count in frequency.items()]

