const JOBS = [
  {
    abridged: 'full',
    male: 'Développeur fullstack',
    female: 'Développeuse fullstack',
  },
  {
    abridged: 'front',
    male: 'Développeur front-end',
    female: 'Développeuse front-end',
  },
  {
    abridged: 'back',
    male: 'Développeur back-end',
    female: 'Développeuse back-end',
  },
  {
    abridged: 'devops',
    male: 'DevOps',
    female: 'DevOps',
  },
  {
    abridged: 'mobile',
    male: 'Développeur mobile',
    female: 'Développeuse mobile',
  },
  {
    abridged: 'seo',
    male: 'Expert SEO',
    female: 'Experte SEO',
  },
  {
    abridged: 'ui',
    male: 'Designer UI',
    female: 'Designeuse UI',
  },
  {
    abridged: 'ux',
    male: 'Designer UX',
    female: 'Designeuse UX',
  },
  {
    abridged: 'chief',
    male: 'Chef de projet',
    female: 'Cheffe de projet',
  },
  {
    abridged: 'scrum',
    male: 'Scrum Master',
    female: 'Scrum Master',
  },
];

const TECHNOS = {
  full: ['Django/Vue.js', 'NodeJS/React.js', 'Symphony/Angular'],
  front: ['React.js/Tailwind', 'Vue.js/Material', 'Angular/Bootstrap'],
  back: ['NodeJS/Express', 'Python/Django'],
  devops: ['NodeJS/Docker', 'Python/Kubernetes'],
  mobile: ['iOS/Swift', 'Android/Kotlin'],
  seo: [''],
  ui: [''],
  ux: [''],
  chief: [''],
  scrum: [''],
};

/**
 * Retrieves a random freelance profile.
 * @returns {Object} The freelance profile containing the name, job title, and picture.
 */
async function getRandomFreelance() {
  try {
    const response = await fetch('https://randomuser.me/api/?nat=fr');

    if (response.ok) {
      const data = await response.json();
      const user = data.results[0];

      const randomJobIndex = Math.floor(Math.random() * JOBS.length);
      const randomTechnoIndex = Math.floor(
        Math.random() * TECHNOS[user.job.abridged].length
      );

      const job = JOBS[randomJobIndex];
      const techno = TECHNOS[user.job.abridged][randomTechnoIndex];

      const name = `${user.name.first} ${user.name.last}`;
      const jobTitle = `${user.job[user.gender]} ${techno}`.trim();
      const picture = user.picture.large;

      return { name, jobTitle, picture };
    } else {
      console.error(
        `HTTP-Error-${response.status} while fetching random freelances profiles at https://randomuser.me/api/?nat=fr`
      );
    }
  } catch (err) {
    console.error(
      `An error as occurred while fetching https://randomuser.me/api/?nat=fr: ${err}`
    );
  }
}

/**
 * Retrieves a specified number of random profiles.
 *
 * @param {number} quantity - The number of profiles to retrieve.
 * @returns {Array} - An array of random profiles.
 */
export async function getRandomProfiles(quantity) {
  const profiles = [];

  for (let i = 0; i < quantity; i++) {
    const profile = await getRandomFreelance();
    profiles.push(profile);
  }

  return profiles;
}
