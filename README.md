FIFA LIGHT — Full Next.js Tournament system (client-side admin)

Structure:
- pages/: index, main, server, tournament, teams, players
- public/: images + data/*.json
- styles/: globals.css

Admin editing: enter admin key (use the ID provided in the server) to enable Add Team / Add Player / Edit Player stats. Admin edits are saved to localStorage in your browser under 'fifalight_data'.

To run locally:
 npm install
 npm run dev

Notes:
- This demo stores admin edits in localStorage (browser). For multi-admin persistence use a backend or database.
