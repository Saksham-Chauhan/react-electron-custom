# Creates build function to convert all *.js files to *.jsc
func() { 
  for i in $(find ./public/ -name '*.js') 
    do
      if [[ $i != *loader* ]]; then
       rm -rf $i
      fi
     #bytenode -c $i 
    done
};
func
