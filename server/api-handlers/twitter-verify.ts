// POST /verify/:handle
// must include signature in json body

import {RequestHandler} from "express";
import {Services} from "../types";

import Twitter from "twitter";

const TWEET_TEMPLATE = "I am verifying for @verses_xyz: sig:"

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN
})

// signature is their handle signed with their address
export function verify({prisma}: Services): RequestHandler {
    return async (req, res) => {
        const handle = req.params.handle
        const { signature, walletId } = req.body

        const existingUser = await prisma.user.findFirst({
            where: { id: walletId },
        });

        if (existingUser.twitterVerified) {
            console.log(`already verified user: @${existingUser.twitterUsername}`)
            res.json({ status: "ok", msg: "already verified"})
            return
        }

        // otherwise, verify (check 100 most recent tweets)
        client.get('statuses/user_timeline', {
            screen_name: handle,
            include_rts: false,
            count: 100,
            tweet_mode: 'extended',
        }, (error, tweets, response) => {

            if (!error) {
                for (const tweet of tweets) {
                    const parsedSignature = tweet.full_text.slice(TWEET_TEMPLATE.length).split(" ")[0];
                    if (tweet.full_text.startsWith(TWEET_TEMPLATE) && (parsedSignature === signature)) {
                        // upsert
                        prisma.user.upsert({
                            where: { id: walletId },
                            update: {
                                twitterVerified: true,
                                twitterUsername: handle,
                            },
                            create: {
                                id: walletId,
                                twitterVerified: true,
                                twitterUsername: handle,
                            },
                        }).then((tx) => {
                            console.log(`new verified user: @${handle}, ${signature}`)
                            res.status(201).json(tx)
                        })
                        .catch(e => {
                            console.log(`err @ /verify/:handle : ${e}`)
                            res.status(500).send(JSON.stringify(e))
                        });
                        return
                    }
                }
                res.status(500).json({message: 'No matching Tweets found'})
            } else {
                res.status(500).send({message: 'Internal Error'})
            }
        })
    }
}