insert into _user (
first_name, 
last_name,
email, 
phone_number, 
pass_hash
) values (
$1, 
$2, 
$3, 
$4, 
$5 
)

returning first_name, last_name, email, phone_number