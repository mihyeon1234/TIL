import random

dustCity={'영등포구':58,"서대문구":54,"도봉구":70,"강남구":40,"종로구":50,"강동구":23}
print(dustCity)
print(dustCity['영등포구']) # 58
# dustCity={key:velue}
# dustCity={velue:key}

print(random.choices(list(dustCity.keys()))) # 구 중에 랜덤
print(random.choices(list(dustCity.values()))) # 수치 중에 랜덤
print(random.choices(list(dustCity.items()))) # 구, 수치 둘다 쌍으로

