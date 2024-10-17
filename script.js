let threads = JSON.parse(localStorage.getItem("threads")) || [];
        
function createThread() {
    const title = document.getElementById('thread-title').value;
    const content = document.getElementById('thread-content').value;
    if (title && content) {
        const newThread = {
            id: Date.now(),
            title: title,
            content: content,
            replies: []
        };
        threads.push(newThread);
        localStorage.setItem("threads", JSON.stringify(threads));
        document.getElementById('thread-title').value = "";
        document.getElementById('thread-content').value = "";
        renderThreads();
    } else {
        alert("Please fill out both the title and content!");
    }
}

function renderThreads() {
    const threadList = document.getElementById('thread-list');
    threadList.innerHTML = '';
    threads.forEach(thread => {
        const threadElement = document.createElement('div');
        threadElement.className = 'thread';
        threadElement.innerHTML = `
            <div class="thread-title">${thread.title}</div>
            <div class="thread-content">${thread.content}</div>
            <div>
                <input type="text" id="reply-${thread.id}" placeholder="Write a reply" />
                <button class="reply-button" onclick="addReply(${thread.id})">Reply</button>
                <button class="delete-button" onclick="deleteThread(${thread.id})">Delete</button>
            </div>
            <div class="reply-list">
                ${thread.replies.map(reply => `<div class="reply">${reply}</div>`).join('')}
            </div>
        `;
        threadList.appendChild(threadElement);
    });
}

function addReply(threadId) {
    const replyInput = document.getElementById(`reply-${threadId}`);
    const replyContent = replyInput.value;
    if (replyContent) {
        threads = threads.map(thread => {
            if (thread.id === threadId) {
                thread.replies.push(replyContent);
            }
            return thread;
        });
        localStorage.setItem("threads", JSON.stringify(threads));
        replyInput.value = '';
        renderThreads();
    } else {
        alert("Please enter a reply!");
    }
}

function deleteThread(threadId) {
    threads = threads.filter(thread => thread.id !== threadId);
    localStorage.setItem("threads", JSON.stringify(threads));
    renderThreads();
}

document.addEventListener("DOMContentLoaded", renderThreads);