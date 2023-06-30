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
 * @returns {Promise<Object>} A promise that resolves to the random freelance profile.
 */
async function getRandomFreelance() {
  try {
    // Fetch the data from the API
    const response = await fetch('https://randomuser.me/api/?nat=fr');

    if (response.ok) {
      // Parse the JSON data
      const data = await response.json();
      const user = data.results[0];

      // Generate random job and technos
      user.job = JOBS[Math.floor(Math.random() * JOBS.length)];
      user.technos =
        TECHNOS[user.job.abridged][
          Math.floor(Math.random() * TECHNOS[user.job.abridged].length)
        ];

      // Create the freelance profile object
      const freelanceProfile = {
        name: `${user.name.first} ${user.name.last}`,
        jobTitle: `${user.job[user.gender]} ${user.technos}`.trim(),
        picture: user.picture.large,
      };

      return freelanceProfile;
    } else {
      // Handle HTTP error
      console.error(
        `HTTP-Error-${response.status} while fetching random freelances profiles at https://randomuser.me/api/?nat=fr`
      );
    }
  } catch (err) {
    // Handle general error
    console.error(
      `An error as occured while fetching https://randomuser.me/api/?nat=fr : ${err}`
    );
  }
}

export async function getRandomProfiles(quantity) {
  const freelancesProfiles = [];

  for (let _ = 0; _ < quantity; _++) {
    const profile = await getRandomFreelance();
    console.log(profile)
    freelancesProfiles.push(profile);
  }

  return freelancesProfiles;
}
