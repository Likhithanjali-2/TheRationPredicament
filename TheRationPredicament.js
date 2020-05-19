function allocate(quantity_in_kgs, sizes, logistics_constraints, topups, available_capacity){
    var sum=0;
    var temp,rem;
    var result = { 
        "reminder": 0,
        "variant": [], 
        "uoms": [],
        "allocations": [],
        "post_alloc_capacity": []
    };
    result.uoms = logistics_constraints;
    result.variant = sizes;
    for(var i=0;i<logistics_constraints.length;i++){

        if(available_capacity[i] >= logistics_constraints[i]){
            result.allocations[i] = logistics_constraints[i];
            temp = result.allocations[i] + topups[i];
            while(available_capacity[i] >= temp && temp < 100){
                result.allocations[i] = temp;
                temp = result.allocations[i] + topups[i];
            }
            result.post_alloc_capacity[i] = available_capacity[i] - result.allocations[i];
        }else{
            result.allocations[i] = 0;
            result.post_alloc_capacity[i] = available_capacity[i];
        }

        //find the remminder
        sum += result.variant[i]*result.allocations[i]
    }
    rem = quantity_in_kgs - sum ;
    if(rem > 100) rem=rem%10;
    result.reminder = rem;
    return result;     
}
console.log(JSON.stringify(allocate(123, [0.5, 1, 2, 5], [50,50,50,30], [10,10,10,10], [63, 125, 40, 20])));
//console.log(allocate(123, [0.5, 1, 2, 5], [50,50,50,30], [10,10,10,10], [63, 125, 40, 20]),allocate(146, [0.5, 1, 2, 5], [50,50,50,20], [10,10,10,10], [103, 15, 27, 20]),allocate(289, [0.5, 1, 2, 5], [50,50,50,20], [10,10,10,10], [60, 65, 55, 20]));