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
  ${user_id},
  ${title}, 
  ${description}, 
  ${total_time},
  ${project_rate},
  ${client_id},
  ${is_paid},
  ${is_billed} 
  )
returning id;