<?php
$output = [];
$output['success']=true;
$output['data']=[];
$output['data'][] = ['id'=>1,'name'=>'Elizabeth','grade'=>89,'course'=>'Library Science'];

$json_output = json_encode($output);

print($json_output);
?>