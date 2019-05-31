select * from users u
join gigs g on u.id = g.user_id
where u.id = $1