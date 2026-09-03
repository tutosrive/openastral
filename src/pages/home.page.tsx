import { useEffect, useState, type ReactElement } from 'react';
import { RepositoryFullView, RepositoryParcialView } from '../components/repository/repository.component';
import type { Repository, Topic } from '../app/models/models';
import Loading from '../components/loading.component';
import CategoryC from '../components/repository/category.component';
import repositoryService from '../app/services/repository.service';

const base = import.meta.env.VITE_API_URL;

export default function HomePage() {
    const [repos, setRepos] = useState<Repository[]>();
    const [categories, setCategories] = useState<Topic[]>([]);
    const [tags, setTags] = useState<ReactElement[]>([]);
    const fetchCategories = async () => {
        const req = await fetch(`${base}/topics`);
        const res: Topic[] = await req.json();
        if (req.ok === true && req.status === 200 && res instanceof Array) {
            setCategories(res);
        }
    };

    const setReposs = async (refetch: boolean = false) => {
        /* const r: Array<Repository> = [
            {
                id: '1',
                createdAt: '12/12/2024',
                description:
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus facilis corporis nulla, quisquam distinctio qui maxime sint magni sapiente consectetur. Blanditiis optio obcaecati voluptas quam vero earum repellat ea minus! Optio delectus, eos commodi qui et dolorem accusamus dignissimos, quos sed consectetur ad minus, omnis praesentium expedita laudantium deleniti ducimus. Nostrum, ipsam. Sit, doloremque non sint nostrum perferendis pariatur quae. Magnam dicta ut cum quos similique illo excepturi, nihil animi perspiciatis rerum aut sed architecto culpa incidunt amet odio eum illum doloremque explicabo! Maiores aliquam, non libero commodi numquam aut. Odio facere sunt incidunt. Architecto in quia adipisci libero fugit facere! Distinctio tenetur deserunt, esse quidem placeat sint illo explicabo voluptates et facilis omnis ipsam, cumque quisquam repudiandae aspernatur minus? Obcaecati deleniti est recusandae, adipisci ad aut deserunt beatae? Neque animi tempore fugit? Numquam nihil exercitationem consectetur enim expedita. Consectetur odit eligendi provident consequuntur harum soluta adipisci quidem fuga cumque! Vero officiis, tempore quidem quod explicabo pariatur numquam atque consequuntur culpa non dolores, tenetur expedita recusandae excepturi aspernatur amet, facilis optio rerum. Vero nemo doloribus amet, ipsa debitis officiis sunt. Vero, voluptas magnam. Suscipit recusandae, cupiditate in voluptate nobis veritatis odit necessitatibus ipsam molestias odio, doloremque ex, tenetur facilis officiis voluptatum. Repudiandae modi possimus perspiciatis ex expedita odio voluptatem incidunt! Minima quia nam quasi sunt dolorum expedita voluptatem autem suscipit, ut, aperiam laborum doloremque natus dolorem temporibus. Culpa consequuntur, quam minima reiciendis similique nostrum repellat ipsa deserunt nam! Impedit, accusamus? Neque non vitae vel nostrum ut, officiis id tempore, debitis quod sequi facilis culpa ratione iure excepturi beatae repudiandae corrupti nesciunt maxime tempora consectetur. Doloribus eius in qui omnis amet. In, quo, asperiores nulla necessitatibus modi itaque iste cum eligendi odio quidem laborum corporis libero. Veritatis ducimus atque sit architecto a nesciunt aut voluptates culpa, quos blanditiis at est in? Magnam, provident! Corporis tenetur dolores, quae temporibus soluta, vitae, optio modi delectus exercitationem ullam dolorem esse consequatur officiis suscipit dignissimos ducimus nesciunt! Quo blanditiis laboriosam amet expedita aliquid reprehenderit veniam? Asperiores nihil quo a perferendis excepturi, eos sit nesciunt repellendus, maiores odio, architecto nobis? Nostrum totam, eum quos incidunt vel expedita quis fugit eos modi, sapiente fugiat. Aut, quidem repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptatem exercitationem rem suscipit. Dicta reiciendis labore nemo nesciunt nulla est nostrum vero consectetur ipsam eligendi itaque fugiat, necessitatibus iure aspernatur! Voluptatum sunt, ullam dignissimos cum, possimus corrupti beatae libero quod sit odit, corporis expedita distinctio tempore quis architecto ratione. Sit quos accusamus voluptatibus doloribus tempora ut cupiditate voluptates, cumque vitae. Expedita iste pariatur suscipit nihil maxime, perspiciatis dolore voluptates accusamus dolorum deleniti repudiandae voluptatem rem eligendi ullam nesciunt sit vero enim, blanditiis maiores assumenda reprehenderit saepe? Minus repudiandae itaque facilis? Corrupti placeat dignissimos tenetur illo molestias tempora doloribus quas sequi consequuntur nisi, in provident voluptatibus fugiat aliquam at! Est rerum quo at deserunt rem iste, earum nam explicabo accusantium ab.',
                diskUsage: 110,
                forkCount: 1110,
                homepageUrl: null,
                isArchived: false,
                name: 'supabase-csharp',
                pushedAt: null,
                sshUrl: '',
                stargazerCount: 1000,
                url: 'https://github.com/supabase-community/supabase-csharp',
                license: { id: 'jjas9as', name: 'MIT', url: 'https://opensource.org/license/mit' },
                readmeUrl: null,
                primaryLanguage: { id: 'kajsias1', color: 'blue', name: 'Typescript' },
                owner: { id: 'jduad', url: 'https://github.com/supabase-community', login: 'supabase-community', avatarUrl: 'https://avatars.githubusercontent.com/u/87650496?s=200&v=4' },
                ownerStarred: { id: 'ed2323', bio: null, avatarUrl: 'https://avatars.githubusercontent.com/u/87650496?s=200&v=4', company: null, createdAt: '', email: null, location: null, login: '', name: null, url: '', websiteUrl: null, stargazerCount: 0 },
                topics: categories,
            },
        ]; */
        const res = await repositoryService.getAll(refetch);
        setRepos(res);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setReposs();
        // const elementTags = categories.map((cat) => {
        //     return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
        // });
        // setTags(elementTags);
    }, []);

    useEffect(() => {
        console.log(repos);
    }, [repos]);

    return (
        <div id="home-page" className="w-full h-full pb-10">
            {repos ? (
                <div className="h-full">
                    <div className="h-screen">
                        {repos.length > 0 ? (
                            repos.map((repo) => {
                                let elementTags = [<span className="italic text-neutral">Not categories</span>];
                                if (repo.topics && repo.topics.length > 0) {
                                    elementTags = repo.topics.map((cat) => {
                                        return <CategoryC to={`/categories/${cat.name}`} key={`tag-${cat.id}`} name={cat.name} />;
                                    });
                                }
                                return <RepositoryParcialView key={repo.id} repository={repo} topics={elementTags} />;
                            })
                        ) : (
                            <Loading />
                        )}
                        {/* <RepositoryFullView repository={repos[0]} topics={tags} /> */}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
