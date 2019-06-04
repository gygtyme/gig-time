update gig
set 

  title = ${title}, 
  description = ${description}, 
  total_time = ${total_time},
  project_rate = ${project_rate},
  client_id = ${client_id},
  is_paid = ${is_paid},
  is_billed = ${is_billed} 
  
where id = ${id}