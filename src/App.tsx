/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Design } from './components/Design';
import { Insights } from './components/Insights';
import { Conclusion } from './components/Conclusion';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <Layout>
      <Home />
      <About />
      <Process />
      <Projects />
      <Design />
      <Insights />
      <Conclusion />
      <Contact />
    </Layout>
  );
}
