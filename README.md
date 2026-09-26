> Build In: ![wakatime](https://wakatime.com/badge/user/af6e3d3d-e2b5-480d-a492-1fbd9614f9c5/project/311e4662-9c26-4675-9f02-ee52d2be3c8c.svg)

> [!IMPORTANT]
> This project use "[SAWP](https://github.com/tutosrive/sawp)" to save all data used on Postgres database (But this template, use Supabase-Js, if you want use other BaaS or your own backend, off course, you can fork this and just change all queries from Supabase to your BaaS)

This project is to show all my github starred repositories (Stargazers) in a nice website, it uses Supabase to get all data in real-time and to make nice queries that relational databases allow.

You can use this public template, just set your own credentials and enjoy.

Open Astral is inspired by "[Astral](https://github.com/astralapp/astral)" because it looks nice to me, and I want build 'my own astral' but accesible for any user from internet ... Don't just for me (as Astral makes it)

---

<h2 class="text-primary text-4xl">Why?</h2>

Because I don't just simplify—I genuinely enjoy coding, and I will always prefer a nicely crafted web app and a proper piece of work over a basic ["Stargazer"](https://github.com/tutosrive/stargazer) README.

---

<h2 class="text-primary text-4xl">Requirements</h2>

<details>
  <summary class="text-primary text-2xl">View all requirements inside supabase (Images)</summary>

1. OpenAstral Supabase Functions Required
 <div class="flex w-dvw justify-center">
   <img class="lg:max-w-200" src="https://cdn.jsdelivr.net/gh/tutosrive/images-projects-srm-trg@main/others/db-functions-required-openastral-v2.png" alt="OpenAstral Supabase Functions Required" />
 </div>
2. OpenAstral Supabase Tables Required
 <div class="flex w-dvw justify-center"><img class="lg:max-w-200" src="https://cdn.jsdelivr.net/gh/tutosrive/images-projects-srm-trg@main/others/db-tables-required-openastral.png" alt="OpenAstral Supabase Tables Required" /></div>
3. OpenAstral Supabase Integrations Required
 <div class="flex w-dvw justify-center"><img class="lg:max-w-200" src="https://cdn.jsdelivr.net/gh/tutosrive/images-projects-srm-trg@main/others/db-integrations-required-openastral-v2.png" alt="OpenAstral Supabase Integrations Required" /></div>
4. OpenAstral Supabase Policies Required
 <div class="flex w-dvw justify-center"><img class="lg:max-w-200" src="https://cdn.jsdelivr.net/gh/tutosrive/images-projects-srm-trg@main/others/db-policies-required-openastral.png" alt="OpenAstral Supabase Policies Required" /></div>
5. OpenAstral Supabase Extensions Required
   <div class="flex w-dvw justify-center"><img class="lg:max-w-200" src="https://cdn.jsdelivr.net/gh/tutosrive/images-projects-srm-trg@main/others/db-extensions-required-openastral.png" alt="OpenAstral Supabase Extensions Required" /></div>
 </details>

- Environment Variables (inside your deploy dashboard ...)
    1. `VITE_SUPABASE_URL={YOur-Secret}`: Your Supabase **HTTP URL**
    2. `VITE_SUPABASE_APIKEY={YOur-Secret}`: Your Supabase **_PUBLISHABLE_** apikey, sure that IS PUBLISHABLE!
    3. `VITE_GH_TOKEN={YOur-Secret}`: Github Token, **_JUST with Public Repo READ_**

---

You need exactly this functions created in Supabase!

1. Function to get repositories with pagination

```sql
         create or replace function public.get_repositories(startl int, endl int)
       returns json
       language plpgsql
       stable
       as $$
         declare
           response json;
         begin
           select json_agg(row_to_json(repos)) into response
           from (
             select
               r.*,
               jsonb_build_object(
                 'id', o.id,
                 'avatar_url', o.avatar_url,
                 'login', o.login,
                 'url', o.url
               ) as owner,
               coalesce(
                 jsonb_agg(to_jsonb(t) order by t.id)
                   filter (where t.id is not null), '[]'::jsonb
               ) as topics
             from public.repository as r
             inner join owner o
               on o.id = r.owner_id
             left join public.topicxrepository as tr
           on tr.idrepo = r.id
           left join public.topic as t
           on t.id = tr.idtopic
           group by r.id, o.id
           order by r.name
           offset get_repositories.startl limit get_repositories.endl
           )repos;
           return coalesce(response, '[]'::json);
       end;
       $$;
```

2. Get repository by topics/categories/tags PAGINATED

```sql
create or replace function get_repositories_by_topic(topics text[], startl int, endl int)
returns json
language plpgsql
stable
as $$ declare response json;
  begin
    select json_agg(row_to_json(repos)) into response
    from (select r.*,
        jsonb_build_object(
          'id', o.id,
          'avatar_url', o.avatar_url,
          'login', o.login,
          'url', o.url
        ) as owner,
        coalesce(
          jsonb_agg(to_jsonb(t) order by t.id)
            filter (where t.id is not null),
          '[]'::jsonb
        ) as topics from repository r
        inner join owner o
          on o.id = r.owner_id
        inner join topicxrepository tr
          on r.id = tr.idrepo
        inner join topic t
          on t.id = tr.idtopic
        where t.name = ANY(get_repositories_by_topic.topics)
        group by r.id, o.id
        order by r.name asc
        offset get_repositories_by_topic.startl limit get_repositories_by_topic.endl
    )repos;
    return coalesce(response, '[]'::json);
  end;
$$;
```

3. Get Just One Repository

```sql
create or replace function public.get_repository (ownername text, reponame text) returns json language plpgsql stable as $$
  declare
    response json;
  begin
    select json_agg(row_to_json(repo)) into response
    from (
      select
        r.*,
        jsonb_build_object(
          'id', o.id,
          'avatar_url', o.avatar_url,
          'login', o.login,
          'url', o.url
        ) as owner,
        coalesce(
          jsonb_agg(to_jsonb(t) order by t.id)
            filter (where t.id is not null),
          '[]'::jsonb
        ) as topics
      from public.repository as r
      inner join owner o
        on o.id = r.owner_id
      left join public.topicxrepository as tr
        on tr.idrepo = r.id
      left join public.topic as t
        on t.id = tr.idtopic
      where r.name = get_repository.reponame and o.login = get_repository.ownername
      group by r.id, o.id
      order by r.name
    )repo;

    return coalesce(response, '{}'::json);
  end;
$$;
```

4. Get the total count of repos with tag/topic/category FILTER

```sql
create or replace function get_count_by_topic(topics text[])
returns integer
language plpgsql
stable
as $$
begin
  return (
    select count(t.name)::integer
    from repository r
    inner join owner o on o.id = r.owner_id
    inner join topicxrepository tr on r.id = tr.idrepo
    inner join topic t on t.id = tr.idtopic
    where t.name = any (get_count_by_topic.topics)
  );
end;
$$;
```

5. Search repositories in MIX mode (matchs owner, repository and topic names ...)

```sql
create or replace function public.find_repositories_mix(regexToFind text, startl integer, total integer) returns json language plpgsql stable as $$
  declare
    response json;
  begin
    select json_agg(row_to_json(repo)) into response
    from (
      select
        count(r.id) OVER() as totalcount,
        r.*,
        jsonb_build_object(
          'id', o.id,
          'avatar_url', o.avatar_url,
          'login', o.login,
          'url', o.url
        ) as owner,
        coalesce(
          jsonb_agg(to_jsonb(t) order by t.id)
            filter (where t.id is not null),
          '[]'::jsonb
        ) as topics
      from public.repository as r
      inner join owner o
        on o.id = r.owner_id
      left join public.topicxrepository as tr
        on tr.idrepo = r.id
      left join public.topic as t
        on t.id = tr.idtopic
      where r.name ~* find_repositories_mix.regexToFind
      or r.description ~* find_repositories_mix.regexToFind
      or t.name ~* find_repositories_mix.regexToFind
      or o.login ~* find_repositories_mix.regexToFind
      group by r.id, o.id
      order by r.name
      offset find_repositories_mix.startl limit find_repositories_mix.total
    )repo;

    return coalesce(response, '{}'::json);
  end;
$$;
```

6. Find JUST repositories

```sql
create or replace function public.find_repositories(regexToFind text, startl integer, total integer) returns json language plpgsql stable as $$
  declare
    response json;
  begin
    select json_agg(row_to_json(repo)) into response
    from (
      select
        count(r.id) OVER() as totalcount,
        r.*,
        jsonb_build_object(
          'id', o.id,
          'avatar_url', o.avatar_url,
          'login', o.login,
          'url', o.url
        ) as owner,
        coalesce(
          jsonb_agg(to_jsonb(t) order by t.id)
            filter (where t.id is not null),
          '[]'::jsonb
        ) as topics
      from public.repository as r
      inner join owner o
        on o.id = r.owner_id
      left join public.topicxrepository as tr
        on tr.idrepo = r.id
      left join public.topic as t
        on t.id = tr.idtopic
      where r.name ~* find_repositories.regexToFind
      or r.description ~* find_repositories.regexToFind
      group by r.id, o.id
      order by r.name
      offset find_repositories.startl limit find_repositories.total
    )repo;

    return coalesce(response, '{}'::json);
  end;
$$;
```

7. Find JUST topics

```sql
create or replace function public.find_topics(regexToFind text, startl integer, total integer) returns json language plpgsql stable as $$
  declare
    response json;
  begin
    select json_agg(row_to_json(repo)) into response
    from (
      select
        count(t.id) OVER() as totalcount,
        t.*
      from public.repository as r
      left join public.topicxrepository as tr
        on tr.idrepo = r.id
      left join public.topic as t
        on t.id = tr.idtopic
      where t.name ~* find_topics.regexToFind
      group by t.id, t.name
      order by t.name
      offset find_topics.startl limit find_topics.total
    )repo;

    return coalesce(response, '[]'::json);
  end;
$$;
```

---

# Future features

- Highlight search results
