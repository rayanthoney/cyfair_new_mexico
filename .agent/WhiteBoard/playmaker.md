# Whiteboard

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>10-Second Scramble Drill</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1f2937; color: white; }
        canvas { background-color: #d1a677; border: 4px solid #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: block; margin: 0 auto; }
        .controls { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
        button { padding: 10px 20px; border-radius: 6px; font-weight: bold; transition: all 0.2s; cursor: pointer; }
        .btn-start { background-color: #10b981; color: white; border: none; }
        .btn-start:hover { background-color: #059669; }
        .btn-reset { background-color: #ef4444; color: white; border: none; }
        .btn-reset:hover { background-color: #dc2626; }
        .legend { display: flex; justify-content: center; gap: 1.5rem; margin-top: 10px; font-size: 0.9rem; }
        .dot { height: 12px; width: 12px; display: inline-block; border-radius: 50%; margin-right: 5px; }
    </style>
</head>
<body class="flex flex-col items-center justify-center min-h-screen p-4">

    <div class="text-center mb-4">
        <h1 class="text-2xl font-bold mb-2">The 10-Second Scramble</h1>
        <p class="text-gray-400 text-sm">Mixed Teams: 1 Guard & 1 Big per side</p>
    </div>

    <div id="canvas-container" class="w-full max-w-lg relative">
        <canvas id="drillCanvas"></canvas>
    </div>

    <div class="legend">
        <!-- Legend updated to remove specific position labels since teams are mixed -->
        <div class="flex items-center"><span class="dot bg-blue-600"></span> Offense</div>
        <div class="flex items-center"><span class="dot bg-red-600"></span> Defense</div>
        <div class="flex items-center"><span class="dot bg-orange-500"></span> Ball</div>
    </div>

    <div class="controls">
        <button class="btn-start" onclick="startDrill()">Run Drill</button>
        <button class="btn-reset" onclick="resetDrill()">Reset</button>
    </div>

    <div class="mt-6 bg-gray-800 p-4 rounded-lg max-w-lg text-sm text-gray-300">
        <p><strong>Visual Logic:</strong> 
        <br><strong>O1 (Guard):</strong> Sprints to ball.
        <br><strong>X1 (Guard):</strong> Drops to stop ball.
        <br><strong>O2 (Big):</strong> Sprints to rim/block.
        <br><strong>X2 (Big):</strong> Protects paint.</p>
    </div>

    <script>
        const canvas = document.getElementById('drillCanvas');
        const ctx = canvas.getContext('2d');

        // State variables
        let animationId;
        let step = 0; // 0: Setup, 1: Toss, 2: React/Play
        let progress = 0;
        
        // Dimensions (set dynamically)
        let width, height, courtW, courtH;

        // Entities
        let ball = { x: 0, y: 0, tx: 0, ty: 0, sx: 0, sy: 0 };
        // Players
        let players = [];
        
        function resize() {
            const container = document.getElementById('canvas-container');
            width = container.clientWidth;
            height = width * 0.9; // Aspect ratio for half court
            canvas.width = width;
            canvas.height = height;
            courtW = width;
            courtH = height;
            resetDrill();
        }

        function initPlayers() {
            // Stacked on the right side of the key (looking at hoop)
            // Coordinates relative to 0-1 scale
            const startX = 0.65; 
            const startY = 0.85; // Near baseline
            const gap = 0.05;

            // Updated Logic: 1 & 3 are Offense, 2 & 4 are Defense
            // Composition: 1&2 are Guards, 3&4 are Bigs
            players = [
                // Player 1: Offense (Guard) -> Goes to Ball
                { id: 1, team: 'off', x: startX, y: startY - (gap*0), tx: 0.5, ty: 0.25, label: 'G-Off' }, 
                
                // Player 2: Defense (Guard) -> Drops to Paint/Help
                { id: 2, team: 'def', x: startX, y: startY - (gap*1), tx: 0.5, ty: 0.55, label: 'G-Def' },  
                
                // Player 3: Offense (Big) -> Rims run to block
                { id: 3, team: 'off', x: startX, y: startY - (gap*2), tx: 0.7, ty: 0.8, label: 'B-Off' }, 
                
                // Player 4: Defense (Big) -> Protects Rim (Deep Drop)
                { id: 4, team: 'def', x: startX, y: startY - (gap*3), tx: 0.5, ty: 0.8, label: 'B-Def' },   
            ];

            ball = { x: 0.5, y: 0.95, sx: 0.5, sy: 0.95, tx: 0.5, ty: 0.25 }; // Start at coach (baseline) go to top of key
        }

        function drawCourt() {
            // Background
            ctx.fillStyle = '#d1a677'; // Wood color
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();

            // Lane (Key) - Standard roughly scaled
            const keyWidth = courtW * 0.3;
            const keyHeight = courtH * 0.45;
            const keyX = (courtW - keyWidth) / 2;
            
            ctx.strokeRect(keyX, courtH - keyHeight, keyWidth, keyHeight);

            // Free Throw Circle
            ctx.beginPath();
            ctx.arc(courtW / 2, courtH - keyHeight, keyWidth / 2, Math.PI, 0);
            ctx.stroke();

            // 3 Point Line
            ctx.beginPath();
            // Top arc
            ctx.arc(courtW / 2, courtH - (courtW * 0.1), courtW * 0.4, Math.PI, 0);
            ctx.stroke();

            // Hoop & Backboard
            ctx.beginPath();
            ctx.moveTo((courtW / 2) - 20, courtH - 20);
            ctx.lineTo((courtW / 2) + 20, courtH - 20); // Backboard
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(courtW / 2, courtH - 15, 5, 0, Math.PI * 2); // Rim
            ctx.strokeStyle = 'orange';
            ctx.stroke();
            ctx.strokeStyle = '#fff';
        }

        function drawEntities() {
            // Draw Ball
            ctx.beginPath();
            ctx.arc(ball.x * courtW, ball.y * courtH, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'orange';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Draw Players
            players.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x * courtW, p.y * courtH, 11, 0, Math.PI * 2);
                ctx.fillStyle = p.team === 'off' ? '#2563eb' : '#dc2626'; // Blue vs Red
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = 'bold 9px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.label, p.x * courtW, p.y * courtH);
            });

            // Draw "Coach" marker
            ctx.fillStyle = 'black';
            ctx.fillText("Coach", 0.5 * courtW, 0.98 * courtH);
        }

        function update() {
            if (step === 1) {
                // Toss Ball
                if (progress < 1) {
                    progress += 0.02;
                    ball.x = ball.sx + (ball.tx - ball.sx) * progress;
                    ball.y = ball.sy + (ball.ty - ball.sy) * progress;
                    
                    // Arc effect for ball
                    ball.y -= Math.sin(progress * Math.PI) * 0.1; 
                } else {
                    step = 2;
                    progress = 0;
                    // Set player start positions to current
                    players.forEach(p => { p.sx = p.x; p.sy = p.y; });
                }
            } else if (step === 2) {
                // Players move
                if (progress < 1) {
                    progress += 0.015;
                    players.forEach(p => {
                        p.x = p.sx + (p.tx - p.sx) * progress;
                        p.y = p.sy + (p.ty - p.sy) * progress;
                    });
                }
            }

            drawCourt();
            drawEntities();

            if (step > 0 && progress < 1.05) {
                animationId = requestAnimationFrame(update);
            }
        }

        function startDrill() {
            if (step === 0) {
                step = 1;
                update();
            }
        }

        function resetDrill() {
            cancelAnimationFrame(animationId);
            step = 0;
            progress = 0;
            initPlayers();
            drawCourt();
            drawEntities();
        }

        // Initialize
        window.addEventListener('resize', resize);
        // Initial setup
        setTimeout(resize, 100);

    </script>
</body>
</html>
```

# Drill:
```text
Drill: The 10-Second Scramble

Category: Transition Offense / Transition Defense / Conditioning

Level: Youth (U12 - U16)

Time Required: 10-15 Minutes

The Concept

This is a high-intensity 2 vs 2 drill designed to simulate the chaotic nature of a loose ball or a long rebound. By putting a hard time cap (10 seconds) on the possession, players are forced to make immediate decisions.

Critical Detail: Each team consists of one Guard and one Big. This forces players to learn how to play within their position roles during transition (Guards handling/creating, Bigs spacing/rim-running).

Setup & Visuals

Refer to the interactive board for the animation.

Players: 10 total.

Starting Position: * Coach stands under the basket on the baseline with a ball.

4 active players line up single-file along the lane line.

The Line-up Order (Crucial):
To ensure every possession has 1 Big + 1 Guard vs 1 Big + 1 Guard, line players up in this specific order:

Guard (Will be Offense)

Guard (Will be Defense)

Big (Will be Offense)

Big (Will be Defense)

The Trigger: The Coach tosses the ball past the 3-point line.

Instructions

The Toss: The drill begins when the Coach tosses the ball high and far past the three-point line.

The Sprint:

Player 1 (Offensive Guard): Sprints to gather the loose ball immediately.

Player 2 (Defensive Guard): Must react instantly to transition to defense, picking up the ball handler.

Player 3 (Offensive Big): Sprints to the rim (rim-run) or the opposite block to establish post position.

Player 4 (Defensive Big): Sprints to the deep paint to protect the rim ("Goalie").

The Attack: * As soon as Player 1 touches the ball, the 10-second shot clock starts.

Offense must score a basket within 10 seconds.

Defense must get a stop (rebound, steal, or force a violation).

Rotation: * Once the play ends, the 4 active players exit.

4 new players step in from the sideline, maintaining the Guard-Guard-Big-Big order.

Scoring System

Play to 15 points.

Offense Scores (inside 10s): +2 Points

Offense Scores (And-1 / Foul): +3 Points

Defense Stop (Rebound/Steal): +1 Point

Defense Stop (Charge Taken): +3 Points

Time Violation (>10s): +1 Point for Defense

Coaching Points

For The Guards (Smalls)

Look for the Big: Don't just isolate. As you gather the ball, look to see if your Big (Player 3) has beaten their defender down the floor for an easy layup.

Use the Screen: If the transition layup isn't there, wait for your Big to set a drag screen or seal on the block.

Ball Pressure (Defense): The defensive guard must turn the ball handler and not let them run in a straight line.

For The Bigs (Talls)

Rim Run Hard: The first 3 steps are the most important. If the Offensive Big sprints, they often get an uncontested layup.

Protect the House (Defense): The Defensive Big is the last line of defense. Do not come out to the 3-point line. Stay in the paint, communicate "I'm Help," and force a contested jump shot.

Seal: If the Offensive Big doesn't get the ball early, bury the defender under the rim for a post-entry pass.```