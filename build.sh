# Creates build function to convert all *.js files to *.jsc
func() { 
    for i in $(find ./public/ -name '*.js') 
    do
    #  bytenode -c $i 
     rm -rf $i
    done
};
func