// Game Variables
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let score = 0;

// Emojis for the game
const emojis = ['🎁', '🎂', '🎉', '❤️', '🌹', '🎈', '👑', '💝'];

// Birthday Letter in Arabic with Emojis
const birthdayLetter = `يا أمي الحبيبة، 💕

بمناسبة عيد ميلادك هذا اليوم السعيد، أريد أن أخبرك بكل صدق وحب عميق.

أدرك وأعلم أنك تشعرين وتحسين أننا قد لا نحبك، لكن صدقيني، الحقيقة هي العكس تماماً. نحن نحبك بكل قلوبنا، لكننا للأسف لا نظهر هذا الحب كما يستحق. أعترف بأنني قد لا أظهر لك حبي وتقديري يومياً كما يجب، ولكن هذا لا يعني أن الحب غير موجود. بل هو موجود في كل لحظة، في كل شيء نفعله، وفي كل تفكير فينا.

أنتِ التي ربيتينا وعلمتينا وحملتِ همنا على كتفيك، أنتِ من صنعتِ منا من نحن اليوم. بكل صبرك وحنانك وتضحيتك، أعطيتينا الحب والقوة والشجاعة لنواجه الحياة. 💪

أنتِ نورنا في الظلام وسندنا في الشدة. وأنا أعترف بأنه من واجبي أن أريكِ وأظهر لكِ حبي واحترامي وتقديري كل يوم، لأنك تستحقين أكثر من هذا بكثير.

اللهم يا رب العالمين، أدعوك في هذا اليوم المبارك أن تحفظي أمي من كل سوء وشر. اللهم أطل عمرها في صحة وعافية، وأحطيها برحمتك وحنانك اللامحدود. اللهم اجعليها دائماً في أحسن صحة وأفضل حال، وارزقيها السعادة والهناء في الدنيا والآخرة. 🙏

اللهم يا من تجيب دعاء المضطرين، استجب دعائي لأمي الغالية. اللهم اغفر لها وارحمها، وأسعديها بكل خير، وأدخليها جنتك برحمتك يا أرحم الراحمين. اللهم حقق كل أحلامها وطموحاتها، وأكتب لها الخير في كل خطواتها.

كل عام وأنتِ بألف خير يا أمي الغالية، وعساكِ تسعدي دائماً وتحظي بكل الخير والصحة والسعادة، وأدام الله عمرك لنا بكل خير وسعادة. 🎉

مع أطيب التمنيات والدعوات،
ابنك الذي يحبك ❤️`;

// Initialize Game
function initGame() {
    const gameGrid = document.getElementById('memoryGrid');
    gameGrid.innerHTML = '';
    
    // Create pairs of cards
    let cardValues = [...emojis, ...emojis];
    
    // Shuffle cards
    cardValues = cardValues.sort(() => Math.random() - 0.5);
    
    cards = [];
    cardValues.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${emoji}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(index));
        gameGrid.appendChild(card);
        cards.push({ emoji, flipped: false, matched: false });
    });
    
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    score = 0;
    updateGameInfo();
}

// Flip Card
function flipCard(index) {
    // Prevent flipping more than 2 cards at a time
    if (flippedCards.length >= 2) return;
    
    // Prevent flipping already matched cards
    if (cards[index].matched) return;
    
    // Prevent flipping the same card twice
    if (flippedCards.includes(index)) return;
    
    // Flip the card
    const card = document.querySelectorAll('.memory-card')[index];
    card.classList.add('flipped');
    cards[index].flipped = true;
    flippedCards.push(index);
    
    // Check for match
    if (flippedCards.length === 2) {
        moves++;
        updateGameInfo();
        setTimeout(checkMatch, 500);
    }
}

// Check Match
function checkMatch() {
    const [first, second] = flippedCards;
    const cards1 = document.querySelectorAll('.memory-card');
    
    if (cards[first].emoji === cards[second].emoji) {
        // Match found
        cards[first].matched = true;
        cards[second].matched = true;
        cards1[first].classList.add('matched');
        cards1[second].classList.add('matched');
        score++;
        updateGameInfo();
        
        // Check if game is won
        if (score === emojis.length) {
            setTimeout(winGame, 500);
        }
    } else {
        // No match, flip back
        cards1[first].classList.remove('flipped');
        cards1[second].classList.remove('flipped');
        cards[first].flipped = false;
        cards[second].flipped = false;
    }
    
    flippedCards = [];
}

// Update Game Info
function updateGameInfo() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('score').textContent = score;
}

// Win Game
function winGame() {
    const popup = document.getElementById('winPopup');
    popup.classList.remove('hidden');
}

// Open Letter
function openLetter() {
    const modal = document.getElementById('letterModal');
    const letterContent = document.getElementById('letterContent');
    letterContent.innerHTML = birthdayLetter.replace(/\n/g, '<br>');
    modal.classList.remove('hidden');
}

// Close Letter
function closeLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.add('hidden');
}

// Reset Game
function resetGame() {
    const popup = document.getElementById('winPopup');
    popup.classList.add('hidden');
    initGame();
}

// Theme Switcher
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const theme = this.dataset.theme;
        document.body.className = theme;
        
        // Update active button
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Start the game when page loads
window.addEventListener('load', initGame);