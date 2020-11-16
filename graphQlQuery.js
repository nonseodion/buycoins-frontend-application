//Graphql query and handlers

//date handlers
const getDuration = (timeStamp, form) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const time = { second, minute, hour, day};
  return Math.floor(timeStamp / time[form]);
}

const formatDate = (date) => {
  const modTimeStamp = Date.parse(date);
  const modDate = (new Date(modTimeStamp)).toDateString()
  const days = getDuration(Date.now() - modTimeStamp, "day");
  if(days >= 30){
    const [_, month, day, year] = /\s(\w{3})\s(\d{2})\s(\w{4})/.exec(modDate);
    return `on ${month} ${parseInt(day)} ${(new Date()).getFullYear() === +year ? "" : year}`
  }
  else{
    const durations =  ["day", "hour", "minute", "second"].map(form =>{
      const since = getDuration(Date.now() - modTimeStamp, form)
        return `${since} ${since > 1 ? form + "s": form} ago`;
      })
      .filter( value => parseInt(value) !== 0)
    return durations[0];
  }
}

const populateTemplate = (repository) => {
  const repositoryNode = document.createElement("div");
  repositoryNode.className = "repository";
  repositoryNode.innerHTML = `
    <div>
      <a href="${repository.url}" class="repository__name">${repository.name ? repository.name : ""}</a>
      ${repository.parent ? 
        '<span class="repository__parent">Forked from <a href="' + repository.parent.url + 
        '\" class="fork">' + repository.parent.name + '</a></span>':
        ""
        }
      <p class="repository__description">
        ${repository.description ? repository.description : ""}
      </p>
      <div class="repository__details">
        ${repository.primaryLanguage ? 
          '<span class="language"><span class="language__circle" style="background-color:' 
          + repository.primaryLanguage.color + 
          '"></span>&nbsp;<span class="language__name">' + 
          repository.primaryLanguage.name + '</span></span>':
          ""
        }
        ${repository.stargazerCount ?
          '<span class="stars"><a href="https://github.com/nonseodion/' + repository.name + '/stargazers">' +
            '<svg viewBox="0 0 16 16" version="1.1" width="15" height="15" aria-hidden="true"><path fill-rule="evenodd" fill="#6a737d" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>' +
            '&nbsp;' + repository.stargazerCount + 
          '</a></span>':
          ""
        }
        ${repository.forkCount || (repository.parent ? repository.parent.forkCount: undefined) ?
          '<span class="pulls">' +
            '<a href="https://github.com/nonseodion/'+ repository.name + '/network/members">' +
            '<svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill="#6a737d" fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>' +
              '&nbsp;'+ (repository.forkCount || repository.parent.forkCount) +
            '</a>' +
          '</span>':
          ""
        }
        ${repository.licenseInfo ?
          '<span class="cert">' +
            '<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill="#6a737d" fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>' +
            '&nbsp;' + repository.licenseInfo.name +
          '</span>' :
          ""
        }
        <span class="last-updated">Updated ${formatDate(repository.updatedAt)}</span>
      </div>
    </div>
    <div>
      <button class="repository__star">
        <svg viewBox="0 0 16 16" version="1.1" width="15" height="15" aria-hidden="true"><path fill-rule="evenodd" fill="#6a737d" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
        &nbsp;Star
      </button>
    </div>
  `
  return repositoryNode;
}

const getReposData = (repositories) => {
  const repositoriesNode = document.querySelector(".repositories");
  document.querySelectorAll(".amount__repositories")
    .forEach(ele => ele.textContent = repositories.length);
    repositories.forEach( repository => {
      repositoriesNode.append(populateTemplate(repository.node));
    })
  
}

const getUserData = (object) => {
  document.querySelector(".name").textContent = object.name;
  document.querySelector(".description").textContent = object.bio;
  document.querySelectorAll(".profile-pic").forEach( img => img.src = object.avatarUrl);
  getReposData(object.repositories.edges);
}



const query  = `{
  user(login: "nonseodion") {
    bio
    name
    avatarUrl
    repositories(first: 20, orderBy: {direction: DESC, field: UPDATED_AT}) {
      edges {
        node {
          name
          url
          parent {
            name
            url
            forkCount
          }
          description
          primaryLanguage {
            color
            name
          }
          stargazerCount
          forkCount
          licenseInfo {
            name
          }
          updatedAt
        }
      }
    }
  }
}`

fetch("https://api.github.com/graphql", {
  headers:{Authorization: "bearer dac2681f80240eee34bcf9aff6d92c38d3f258a1"}, 
  method: 'POST', 
  body: JSON.stringify({query: query})
})
  .then(res => res.json())
  .then(data => {
    getUserData(data.data.user);
  })
  .catch(err => console.error(err))