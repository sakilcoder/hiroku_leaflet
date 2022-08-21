let statesUrl = 'https://api.imovelmetro.com.br/imo_states'; // DateKey, StateID, StateName, MinPerState, MaxPerState, AveragePerState
let mesoregionsUrl = 'https://api.imovelmetro.com.br/imo_mesoregions'; // Date Key, Estado, Mesoregion ID, Mesoregion name, # cases, Min per Mesoregion, Max per Mesoregion, Average per Mesoregion
let mesoregironsByStateUrl = 'https://api.imovelmetro.com.br/imo_mesoregions/'; //provide state id at end
let citiesByMesoregionUrl = 'https://api.imovelmetro.com.br/imo_cities/'; // Data Key, id, name, state_id, mesoregion_id, price_m2 //provide mesoregion id at end
let saopauloUrl = 'https://api.imovelmetro.com.br/sp_saopaulo'; // (city_id: 5345, meso: 3515, state: 26) id, name, state_id, region_id, price_m2, mesoregion_id -26,54,2
