delete from tasks
where gig_id = $1;

delete from gigs
where id = $1;

