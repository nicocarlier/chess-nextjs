SELECT
    g.id,
    g.created_at,
    CASE
    WHEN g.status = 'white-win' AND g.white_player_id = ${currentUserId} THEN 'win'
    WHEN g.status = 'black-win' AND g.black_player_id = ${currentUserId} THEN 'win'
    WHEN g.status = 'white-win' AND g.black_player_id = ${currentUserId} THEN 'loss'
    WHEN g.status = 'black-win' AND g.white_player_id = ${currentUserId} THEN 'loss'
    WHEN g.status = 'draw' THEN 'draw'
    END AS result,
    g.fen,
    CASE
    WHEN g.white_player_id = ${currentUserId} THEN black_player.name
    ELSE white_player.name
    END AS opponent_name,
    CASE
    WHEN g.white_player_id = ${currentUserId} THEN black_player.id
    ELSE white_player.id
    END AS opponent_id,
    EXTRACT(EPOCH FROM (g.updated_at - g.created_at)) / 60 AS duration
FROM
    games g
    JOIN users AS white_player ON g.white_player_id = white_player.id
    JOIN users AS black_player ON g.black_player_id = black_player.id
WHERE
    (g.white_player_id = ${currentUserId} OR g.black_player_id = ${currentUserId})
    AND g.status != 'underway'
    AND (black_player.name ILIKE ${`%${query}%`} OR white_player.name ILIKE ${`%${query}%`} OR CAST(g.created_at AS TEXT) ILIKE ${`%${query}%`});