update gigs
set title = $1,
    instructions = $2
where id = $3