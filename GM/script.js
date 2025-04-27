let selectedTokens = [];
let groups = {};
let groupCounter = 1;

// Handle token selection
window.addEventListener('message', (event) => {
  try {
    if (event.data?.type === 'selection') {
      selectedTokens = event.data.data?.objects || [];
      console.log('Selected tokens:', selectedTokens);
    }
  } catch (error) {
    console.error('Error processing selection:', error);
  }
});

// Create group
document.getElementById('createGroup').addEventListener('click', () => {
  if (selectedTokens.length === 0) {
    alert('Select tokens first!');
    return;
  }

  const groupId = `group-${groupCounter++}`;
  groups[groupId] = [...selectedTokens];
  console.log(`Group ${groupId} created with ${selectedTokens.length} tokens.`);
  alert(`Group ${groupId} created with ${selectedTokens.length} tokens.`);
});

// Move group
document.getElementById('moveGroup').addEventListener('click', () => {
  const groupId = prompt('Enter group id:');
  if (!groupId) return;

  const group = groups[groupId];
  if (!group) {
    alert('Group not found!');
    return;
  }

  try {
    group.forEach(token => {
      const movedToken = {
        ...token,
        x: token.x + 100
      };

      if (window.parent) {
        window.parent.postMessage({
          type: "update",
          target: "object",
          data: {
            id: token.id,
            updates: {
              x: movedToken.x
            }
          }
        }, '*');
      } else {
        console.warn('Parent window not available');
      }
    });
  } catch (error) {
    console.error('Error moving group:', error);
    alert('Failed to move group: ' + error.message);
  }
});

