// 1. Select DOM Elements

const eventForm = document.querySelector('#event-form');

const titleInput = document.querySelector('#title-input');

const categoryInput = document.querySelector('#category-input');

const searchInput = document.querySelector('#search-input');

const categorySelect = document.querySelector('#category-select');

const eventsContainer = document.querySelector('#events-container');

const counterDisplay = document.querySelector('#active-counter');

const emptyState = document.querySelector('#empty-state');

const formMessage = document.querySelector('#form-message');


// 2. Handle Form Submission

eventForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const title = titleInput.value.trim();

    const category = categoryInput.value;

    if (title.length < 3) {

        formMessage.textContent =
            'Title must be at least 3 characters.';

        return;
    }

    if (!category) {

        formMessage.textContent =
            'Please select a category.';

        return;
    }

    formMessage.textContent = '';

    addEventCard(title, category);

    eventForm.reset();

    filterEvents();

});


// 3. Add New Event Card

function addEventCard(title, category) {

    const card = document.createElement('div');

    card.classList.add('event-card');

    card.dataset.category = category;


    const badge = document.createElement('span');

    badge.classList.add('badge', category);

    badge.textContent =
        category.charAt(0).toUpperCase() +
        category.slice(1);


    const heading = document.createElement('h3');

    heading.classList.add('card-title');

    heading.textContent = title;


    const description = document.createElement('p');

    description.textContent =
        'A new community event.';


    const deleteButton = document.createElement('button');

    deleteButton.classList.add('btn-delete');

    deleteButton.textContent = 'Delete';

    deleteButton.type = 'button';


    card.append(
        badge,
        heading,
        description,
        deleteButton
    );

    eventsContainer.append(card);

}


// 4. Event Delegation for Deletion

eventsContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-delete')) {

        const card = e.target.closest('.event-card');

        card.remove();

        filterEvents();

    }

});


// 5. Search and Category Filter

function filterEvents() {

    const query = searchInput.value.toLowerCase().trim();

    const selectedCategory = categorySelect.value;

    const cards =
        eventsContainer.querySelectorAll('.event-card');

    let count = 0;


    cards.forEach((card) => {

        const title =
            card.querySelector('.card-title')
            .textContent.toLowerCase();

        const category = card.dataset.category;

        const matchesSearch = title.includes(query);

        const matchesCategory =
            selectedCategory === 'all' ||
            category === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = 'block';

            count++;

        } else {

            card.style.display = 'none';

        }

    });


    // 6. Update Counter

    counterDisplay.textContent =
        `Showing ${count} Events`;


    // 7. Empty State

    if (count === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;

    }

}


// 8. Listen to Search Input

searchInput.addEventListener('input', filterEvents);


// 9. Listen to Category Changes

categorySelect.addEventListener('change', filterEvents);