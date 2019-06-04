insert into gig(
  user_id, 
  title, 
  description, 
  total_time, 
  project_rate, 
  client_id, 
  is_paid, 
  is_billed
  )
values(
  $1, 
  $2, 
  $3, 
  0,
  $4, 
  null, 
  false, 
  false   
  )
returning *