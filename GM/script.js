let selectedTokens = [];
let groups = {};
let groupCounter = 1;

// Получаем выбор токенов
window.addEventListener('message', (event) => {
  if (event.data.type === 'selection') {
    selectedTokens = event.data.data.objects || [];
    console.log('Selected tokens:', selectedTokens);
  }
});

// Создание группы
document.getElementById('createGroup').addEventListener('click', () => {
  if (selectedTokens.length === 0) {
    alert('Select tokens first!');
    return;
  }
  const groupId = `group-${groupCounter++}`;
  groups[groupId] = [...selectedTokens];
  alert(`Group ${groupId} created with ${selectedTokens.length} tokens.`);
});

// Перемещение группы
document.getElementById('moveGroup').addEventListener('click', () => {
  const groupId = prompt('Enter group id:');
  const group = groups[groupId];
  if (!group) {
    alert('Group not found!');
    return;
  }

  group.forEach(token => {
    const movedToken = {
      ...token,
      x: token.x + 100
    };
    parent.postMessage({
      type: "update",
      target: "object",
      data: {
        id: token.id,
        updates: {
          x: movedToken.x
        }
      }
    }, '*');
  });
});